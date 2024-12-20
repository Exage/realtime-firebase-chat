export const FormValidation = {
    Name: {
        required: "Name is required",
        maxLength: {
            value: 50,
            message: "Name must not exceed 50 characters"
        },
    },
    Email: {
        required: "Email is required",
        pattern: {
            value: /^\S+@\S+$/i,
            message: "Email is not valid"
        }
    },
    Username: {
        required: "This field is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters long"
        },
        maxLength: {
            value: 20,
            message: "Username must not exceed 20 characters"
        },
        validate: {
            noSpaces: (value) => {
                if (/\s/.test(value)) {
                    return "Username must not contain spaces"
                }
            },
            noAtSymbol: (value) => {
                if (/@/.test(value)) {
                    return "Username must not contain the @ symbol"
                }
            },
            validChars: (value) => {
                const regex = /^[a-zA-Z0-9._]+$/;
                if (!regex.test(value)) {
                    return "The username can only contain letters, numbers, _ and ."
                }
            }
        }
    },
    Password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password should be at least 6 characters"
        }
    },
    GroupTitle: {
        required: "Group title is required",
        maxLength: {
            value: 50,
            message: "Group title must not exceed 50 characters"
        },
    },
    MessageForm: {
        maxLength: {
            value: 500,
            message: 'Message must be less then 500 symbols'
        }
    }
}