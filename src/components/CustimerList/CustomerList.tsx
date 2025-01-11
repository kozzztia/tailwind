import style from "./style.module.css"
import { Customer, mockCustomers } from "./const"
import { useState } from "react"
// empty rectangle
import { FaEllipsisH, FaCheckSquare, FaRegSquare  } from "react-icons/fa"

const CustomerList = () => {
  return (
    <div className={style.listContainer}>
      <CustomerListHeader />

      <List customers={mockCustomers} />
    </div>
  )
}

export default CustomerList

const CustomerListHeader = () => {
  return (
    <header className={style.listHeader}>
      <h2>Customer List</h2>
      <button>
        + Add Customer
      </button>
    </header>

  )
}

const List: React.FC<{ customers: Customer[] }> = ({ customers }) => {
  console.log(customers)
  return (
    <ul className={style.list}>
      {customers.map((customer) => (
        <ListItem key={customer.id} customer={customer} />
      ))}
    </ul>
  )
}

const ListItem: React.FC<{ customer: Customer }> = ({ customer }) => {
  const { name, email, phone, status, createdDate, image } = customer;
  const [cheked, setChecked] = useState(false)
  const checkHandler = () => {
    setChecked(!cheked)
  }
  console.log(image)
  return (
    <li className={`${cheked && style.active} ${style.listItem}`}>
      <button className={style.itemButton}
        onClick={checkHandler}
      >
        {cheked ? <FaCheckSquare /> : <FaRegSquare />}
      </button>
      <div className={style.avatar}>
        {
          image ? <img src={image} alt={name} />
            : <div><p>{name.split(" ")[0][0]}{name.split(" ")[1][0]}</p></div>
        }
      </div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{status}</p>
      <p>{createdDate}</p>

      <button className={style.itemButton}>
        <FaEllipsisH />
      </button>
    </li>
  )
}