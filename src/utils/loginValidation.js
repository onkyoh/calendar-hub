export const validate = ({displayName, email, password}) => {
    let error
    if (displayName.length > 10) error = 'display name max length 10'
    if (displayName === '') error = 'display name required'
    if (email === '') error = 'email required'
    if (password.length < 6) error = 'password min length 6'
    if (password === '') error = 'password required'
    return error
}