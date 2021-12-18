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
        id: item,
        time: this.date,
      });
      return item;
    });
    return history;
  };
}

export default History;
