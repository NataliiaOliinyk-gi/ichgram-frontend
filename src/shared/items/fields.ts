interface ICheck {
  value: number | RegExp;
  message: string;
}

interface IRules {
  required: string;
  pattern?: ICheck;
  minLength?: ICheck;
  maxLength?: ICheck;
}

interface IFieldsItem {
  type: string;
  placeholder: string;
  name: string;
  rules: IRules;
}

export interface IFields {
  email: IFieldsItem;
  fullName: IFieldsItem;
  username: IFieldsItem;
  password: IFieldsItem;
}

const fields: IFields = {
  email: {
    type: "email",
    placeholder: "Email",
    name: "email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
  },
  fullName: {
    type: "text",
    placeholder: "Full Name",
    name: "fullName",
    rules: {
      required: "Full Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
      maxLength: {
        value: 50,
        message: "Name must be less than 50 characters",
      },
    },
  },
  username: {
    type: "text",
    placeholder: "Username",
    name: "username",
    rules: {
      required: "Username is required",
      minLength: {
        value: 2,
        message: "Username must be at least 2 characters",
      },
      maxLength: {
        value: 20,
        message: "Username must be less than 20 characters",
      },
    },
  },
  password: {
    type: "password",
    placeholder: "Password",
    name: "password",
    rules: {
      required: "Password is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
  },
};

export default fields;
