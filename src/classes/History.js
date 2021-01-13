import { JSON } from "../classes/Constants";

class History {
  constructor(wish) {
    this.wish = wish;
    this.date = new Date();
  }

  getWish = () => {
    return this.wish;
  };

  getTime = () => {
    return this.date;
  };

  getHistory = () => {
    let history = [];
    this.wish.map((item) => {
      history.push({
        type: JSON.getType(item),
        name: JSON.getName(item),
        time: this.date,
      });
      return item;
    });
    return history;
  };
}

export default History;
