import { useState } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { encode } from 'blurhash'

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME
const region = import.meta.env.VITE_AWS_BUCKET_REGION
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
})

const randomImageName = () => Array(5)
    .fill(null)
    .map(() => Math.random().toString(36).substring(2))
    .join('')

const generateBlurHash = (image) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
        const blurHash = encode(pixels, canvas.width, canvas.height, 4, 3)
        resolve(blurHash)
    })
}

export const useUploadPhoto = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const uploadPhoto = async (file) => {

        try {
            setLoading(true)
            setError(null)

            if (!file) {
                throw new Error('File not selected')
            }

            const extension = file.name.split('.')[1]
    
            const fileName = `${randomImageName()}_${Date.now()}.${extension}`
    
            const params = {
                Bucket: bucketName,
                Key: `uploads/${fileName}`,
                Body: file,
                ContentType: file.type,
            }

            const command = new PutObjectCommand(params)
            await s3.send(command)

            const url = `https://${bucketName}.s3.${region}.amazonaws.com/uploads/${fileName}`

            const hash = await new Promise((resolve) => {
                const image = new Image()
                image.src = URL.createObjectURL(file)
                image.onload = async () => {
                    const blurHash = await generateBlurHash(image)
                    resolve(blurHash)
                }
            })

            return { hash, url }

        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { loading, error, uploadPhoto }
}

