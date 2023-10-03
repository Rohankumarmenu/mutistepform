const validateInput = (value, type) => {
    const result = { status: true, msg: ''};
    if(!value){
        result.status = false;
        result.msg = 'This field is required';
        return result;
    }

    if(!type) return result;
    
    switch(type){
        case 'email':
            const regex = /^\S+@\S+\.\S+$/;
            result.status = regex.test(value);
            result.msg = 'Invalid Email';
            return result;

        default: return result;
    }
}

export {
    validateInput
}