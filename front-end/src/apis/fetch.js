let instance;
export default class ApisCalls {
  constructor() {
    if (instance) {
      throw new Error("You can only create one Instance");
    }
    instance = this;
  }
  login = async (credentials) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const response = await fetch(
        "http://localhost:8000/auth/login",
        requestOptions
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  verifyToken = async (token) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/token${token}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };
}

export const apis = new ApisCalls();
