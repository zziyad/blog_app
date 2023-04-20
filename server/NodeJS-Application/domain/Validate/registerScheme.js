async (obj) => {
    const { Schema } = metarhia.metaschema;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const definition = {
      username: '?string',
      email: '?string',
      password: '?string',
      validate: (value, path) => {
        if (value.username) {
          if(value.username.length < 4) 
            throw new Error('Username should be at least 4 characters')
        }
        if (value.email) {
          if (!emailRegex.test(value.email))
            throw new Error('Invalid email address');
        }
        if (value.password) {
          if (!passwordRegex.test(value.password)) 
            throw new Error('Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        }
      },
    }
    const schema = Schema.from(definition);
    const checkValid = schema.check(obj);
    return checkValid
};
