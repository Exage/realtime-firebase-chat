import { useState } from 'react'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

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

export const useDeletePhoto = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deletePhoto = async (fileKey) => {
        try {
            setLoading(true)
            setError(null)

            if (!fileKey) {
                throw new Error('File key not provided')
            }

            const params = {
                Bucket: bucketName,
                Key: fileKey,
            }

            const command = new DeleteObjectCommand(params)
            await s3.send(command)

        } catch (error) {
            console.error(error)
            setError(error)
            return { success: false, error }
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, deletePhoto }
}