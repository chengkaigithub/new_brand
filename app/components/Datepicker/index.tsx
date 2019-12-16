import React from 'react';
import { convert2Digit, isLeapYear, range } from '../tools/utils';
import { noop } from '../tools/constants';
import { Scrollpicker } from '../Scrollpicker';

interface DatepickerProps {
  onChange: Function;
}

interface DatepickerState {
  list: Array<any>;
  value: any;
}

export class Datepicker extends React.Component<DatepickerProps, DatepickerState> {
  static defaultProps = {
    startYear: 2018,
    numberOfYears: 10,
    date: 'undefined',
    onChange: noop,
    // proportion: [2, 1, 1],
  };
  private handleChange: (index1: number, index2: number) => void;
  constructor(props: any) {
    super(props);
    this.handleChange = (index1: number, index2: number) => {
      const { list, value } = this.state;
      let newList = [...list];
      let newValue = [...value];
      newValue[index1] = index2;
      let year;
      let month;
      let day;
      let days;
      if (index1 === 0) {
        year = list[index1][index2];
        month = list[1][value[1]];
      }
      if (index1 === 1) {
        year = list[0][value[0]];
        month = list[index1][index2];
      }
      if (index1 === 2) {
        year = list[0][value[0]];
        month = list[1][value[1]];
      }
      days = this.getDays(year, month);
      newList[2] = days;
      day = list[2][value[2]];
      if (days.indexOf(day) === -1) {
        newValue[2] = days.length - 1;
      }
      this.setState({
        list: newList,
        value: newValue,
      });
      const date = this.getDateByIndex(newList, newValue);
      this.props.onChange && this.props.onChange(date);
    };
    const data = this.initialize(props);
    this.state = {
      ...data,
    };
  }

  initialize(props: any) {
    let { startYear, numberOfYears, date } = props;
    const years = range(numberOfYears).map((_item, index) => {
      return Number(startYear) + index;
    });
    const months = range(12).map(i => {
      return i + 1;
    });
    const input = this.getDateInputByString(date);
    if (!input) {
      date = new Date();
    } else {
      date = new Date(input[0], input[1], input[2]);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const days = this.getDays(year, month);
    const list = [years, months, days];
    const value = [years.indexOf(year), months.indexOf(month), days.indexOf(day)];
    return {
      list,
      value,
    };
  }

  getDateInputByString(param: any) {
    if (!param) {
      return null;
    }
    let input = param.split('-');
    if (input.length !== 3) {
      return null;
    }
    input = input.map((item: any) => {
      return Number(item);
    });
    input[1] = input[1] - 1;
    const invalid = input.some((item: any) => {
      if (isNaN(item) || item < 0) {
        return true;
      }
      return false;
    });
    if (invalid) {
      return null;
    }
    return input;
  }

  getDays(year: any, month: any) {
    year = parseInt(year, 10);
    month = parseInt(month, 10);
    let dayNum = 0;
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dayNum = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dayNum = 30;
        break;
      case 2:
        dayNum = isLeapYear(year) ? 29 : 28;
        break;
    }
    const days = range(dayNum).map(i => {
      return i + 1;
    });
    return days;
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.date !== this.props) {
      this.setState({
        ...this.initialize(nextProps),
      });
    }
  }

  getViewList(list: Array<any>) {
    return list.map((item, index) => {
      let tmp = [];
      if (index === 0) {
        tmp = item.map((target: any) => {
          return target + '年';
        });
      }
      if (index === 1) {
        tmp = item.map((target: any) => {
          return target + '月';
        });
      }
      if (index === 2) {
        tmp = item.map((target: any) => {
          return target + '日';
        });
      }
      return tmp;
    });
  }

  getDateByIndex(list: Array<any>, value: any) {
    const ret = list.map((item, index) => {
      return convert2Digit(item[value[index]]);
    });
    return ret.join('-');
  }

  render() {
    // const { proportion } = this.props;
    const { list, value } = this.state;
    const viewList = this.getViewList(list);
    return React.createElement(
      Scrollpicker,
      Object.assign({}, this.props, {
        list: viewList,
        value: value,
        onChange: this.handleChange,
      }),
    );
  }
}
