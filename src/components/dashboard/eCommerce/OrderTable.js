import React, {Component} from 'react';
import OrderTableCell from './OrderTableCell';


let counter = 0;

function createData(orderId, name, image, orderDate, deliveryDate, status) {
  counter += 1;
  return {id: counter, orderId, name, image, orderDate, deliveryDate, status};
}

class OrderTable extends Component {
  state = {
    data: [
      createData('23545', 'Alex Dolgove', require('assets/images/userAvatar/alex-dolgove.png'), '25 Oct', '25 Oct', 'Completed'),
      createData('23653', 'Domnic Brown', require('assets/images/userAvatar/domnic-brown.png'), '28 Oct', '1 Nov', 'On Hold'),
      createData('24567', 'Garry Sobars', require('assets/images/userAvatar/garry-sobars.jpg'), '5 Nov', '10 Nov', 'Delayed'),
      createData('25745', 'Stella Johnson', require('assets/images/userAvatar/stella-johnson.png'), '23 Nov', '26 Nov', 'Cancelled'),
    ],
  };

  render() {
    const {data} = this.state;
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>OrderId</th>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th className="status-cell text-right">Status</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {data.map(data => {
            return (
              <OrderTableCell key={data.id} data={data}/>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;