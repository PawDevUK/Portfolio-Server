const AutoReply_DATA = (name) => {
    return `Hello ${name}\nThis is automatic reply.\nThank you for contacting me.\nI received your message and will comeback to you as soon as it's possible.\nKind Regards.`
}

const MY_AutoReply_DATA = (name,email,message) =>{
    return `${name} just send you email from Portfolio. Here is his message: ${message} here is his email: ${email}`
}


exports.AutoReply_DATA = AutoReply_DATA
exports.MY_AutoReply_DATA = MY_AutoReply_DATA