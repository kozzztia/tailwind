import style from "./style.module.css";
import { Customer, mockCustomers } from "./const";
import { useEffect, useState } from "react";
import { FaEllipsisH, FaCheckSquare, FaRegSquare, FaCopy, FaPen } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const CustomerList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const editHandler = (id: number) => {
    setEditId(editId === id ? null : id);
  };

  const checkHandler = (id: number) => {
    setEditId(null);
    if (checkedList.includes(id)) {
      setCheckedList(checkedList.filter((item) => item !== id));
    } else {
      setCheckedList([...checkedList, id]);
    }
  };

  useEffect(() => {
    setCustomers(mockCustomers);
  }, []);

  return (
    <div className={style.listContainer}
    >
      <CustomerListHeader />
      <List
        customers={customers}
        editHandler={editHandler}
        checkHandler={checkHandler}
        editId={editId}
        checkedList={checkedList}
      />
    </div>
  );
};

export default CustomerList;

const CustomerListHeader = () => {
  return (
    <header className={style.listHeader}>
      <h2>Customer List</h2>
      <button>+ Add Customer</button>
    </header>
  );
};

const List: React.FC<{
  customers: Customer[];
  editHandler: (id: number) => void;
  editId: number | null;
  checkHandler: (id: number) => void;
  checkedList: number[];
}> = ({ customers, editHandler, editId, checkHandler, checkedList }) => {
  return (
    <ul className={style.list}>
      {customers.map((customer) => (
        <ListItem
          key={customer.id}
          customer={customer}
          editHandler={editHandler}
          editId={editId}
          checkHandler={checkHandler}
          checkedList={checkedList}
        />
      ))}
    </ul>
  );
};

const ListItem: React.FC<{
  customer: Customer;
  editHandler: (id: number) => void;
  editId: number | null;
  checkHandler: (id: number) => void;
  checkedList: number[];
}> = ({ customer, editHandler, editId, checkHandler, checkedList }) => {
  const { id, name, email, phone, status, createdDate, image, company } = customer;

  return (
    <li className={`${checkedList.includes(id) && style.activeItem} ${style.listItem}`}>
      <CheckButton id={id} checkHandler={checkHandler} checkedList={checkedList} />
      <div className={style.avatar}>
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div>
            <p>
              {name.split(" ")[0][0]}
              {name.split(" ")[1][0]}
            </p>
          </div>
        )}
      </div>
      <div className={style.info}>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
      <p>{company}</p>
      <p>{phone}</p>
      <span className={`${style.status} ${status === "Active" ? style.activeStatus : style.inactiveStatus}`}>{status}</span>
      <p>{createdDate}</p>
      <EditButton editHandler={() => editHandler(id)} />
      {
        editId === id && (
          <EditForm />
        )
      }
    </li>
  );
};

const CheckButton: React.FC<{ id: number; checkHandler: (id: number) => void; checkedList: number[] }> = ({ id, checkHandler, checkedList }) => {
  return (
    <button className={style.itemButton} onClick={() => checkHandler(id)}>
      {checkedList.includes(id) ? <FaCheckSquare /> : <FaRegSquare />}
    </button>
  );
};

const EditButton: React.FC<{ editHandler: () => void }> = ({ editHandler }) => {
  return (
    <button className={style.itemButton} onClick={editHandler} datatype="edit">
      <FaEllipsisH />
    </button>
  );
};

const EditForm = () => {
  return (
    <nav className={style.editNav}>
      <a href="#"><FaPen />Edit</a>
      <a href="#"><FaDeleteLeft /> Remove</a>
      <a href="#"><FaCopy />Dublicate</a>
    </nav>
  );
};
