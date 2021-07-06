import axios from "axios";
export const phonesSDK = {
  getPhones() {
    return axios.get(`http://localhost:4000/phones`);
  },

  addPhone(
    number: string,
    type: string,
    serial: string,
    color: string,
    metadata: string | undefined
  ) {
    return axios.post(`http://localhost:4000/phones`, {
      number,
      type,
      serial,
      color,
      metadata: JSON.parse(metadata || ``),
    });
  },

  updatePhone(
    _id: string,
    number: string,
    type: string,
    serial: string,
    color: string,
    metadata: object
  ) {
    return axios.put(`http://localhost:4000/phones/${_id}`, {
      number,
      type,
      serial,
      color,
      metadata,
    });
  },

  deletePhone(_id: string) {
    return axios.delete(`http://localhost:4000/phones/${_id}`);
  },
};
