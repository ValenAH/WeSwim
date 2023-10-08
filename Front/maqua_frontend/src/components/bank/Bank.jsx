import React, { useState, useEffect } from "react";
import './Bank.scss'; 
import BankTable from "./BankTable"; 
import AddBankForm from "./AddBankForm"; 
import EditBankForm from "./EditBankForm"; 
import axios from "axios";

const Bank = () => {

  const BankData = [
    {
      id: 222,
      accounts_associated: null,
      contactEmail: "bank@correo.com",
      location: "Some location",
      nameBank: "Bank XYZ",
      typeAccount: "Saving"
    }
  ];

  const [banks, setBanks] = useState(BankData);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:9009/api/bankCustomAPI";

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(apiUrl + "/getAllBanksapi")
        .then(result => setBanks(result.data.bankList))
        .catch(err => console.log(err));
    };
    fetchData();
  }, []);

  const addBank = (bank) => {
    setShowLoading(true);
    axios.post(apiUrl + "/addnewbankapi", bank)
      .then((result) => {
        setBanks([...banks, result.data]);
      })
      .catch((error) => setShowLoading(false));
  };

  const deleteBank = (id) => {
    setBanks(banks.filter((bank) => bank.id !== id));
    axios.post(apiUrl + "/bankremove", { id })
      .then((result) => { })
      .catch((error) => setShowLoading(false));
  };

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: null,
    accounts_associated: "",
    contactEmail: "",
    location: "",
    nameBank: "",
    typeAccount: ""
  };

  const [currentBank, setCurrentBank] = useState(initialFormState);

  const editRow = (bank) => {
    setEditing(true);
    setCurrentBank({
      id: bank.id,
      accounts_associated: bank.accounts_associated,
      contactEmail: bank.contactEmail,
      location: bank.location,
      nameBank: bank.nameBank,
      typeAccount: bank.typeAccount
    });
  };

  const updateBank = (id, updatedBank) => {
    setEditing(false);
    setBanks(
      banks.map((bank) =>
        bank.id === id ? updatedBank : bank
      )
    );
    axios.post(apiUrl + "/updatebank", updatedBank)
      .then((result) => { })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks for Bank</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit Bank</h2>
              <EditBankForm
                setEditing={setEditing}
                currentBank={currentBank}
                updateBank={updateBank}
              />
            </div>
          ) : (
            <div>
              <h2>Add Bank</h2>
              <AddBankForm addBank={addBank} />
            </div>
          )}
        </div>

        <div className="flex-large">
          <h2>View Banks</h2>
          <BankTable
            banks={banks}
            deleteBank={deleteBank}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
};

export default Bank;
