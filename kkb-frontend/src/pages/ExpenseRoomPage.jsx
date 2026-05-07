import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useHistory, useParams } from 'react-router-dom';

import { useEffect, useMemo, useState } from 'react';

export default function ExpenseRoomPage() {

  const history = useHistory();
  const { roomCode } = useParams();

  // Participants
  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState('');

  // Expenses
  const [expenses, setExpenses] = useState([]);

  // Add Expense form
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [whoPaid, setWhoPaid] = useState([]);
  const [whoHasToPay, setWhoHasToPay] = useState([]);

  // Currency
  const [currency, setCurrency] = useState('PHP');

  // Owes
  const [owesList, setOwesList] = useState([]);

  const currencies = [
    'PHP',
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'AUD',
    'CAD',
    'SGD',
    'HKD',
    'CNY',
    'KRW',
    'THB',
    'INR',
    'AED',
    'SAR',
    'MYR',
    'CHF',
    'NZD',
    'SEK',
    'NOK',
    'DKK',
    'ZAR',
    'BRL',
    'MXN',
    'IDR',
    'VND',
  ];

  // Add participant
  const addParticipant = () => {

    if (!participantName.trim()) {
      return;
    }

    setParticipants([
      ...participants,
      participantName.trim(),
    ]);

    setParticipantName('');
  };

  // Toggle checkbox
  const toggleSelection = (
    value,
    list,
    setter
  ) => {

    if (list.includes(value)) {

      setter(
        list.filter((v) => v !== value)
      );

    } else {

      setter([...list, value]);

    }
  };

  // Add expense
  const addExpense = () => {

    if (
      !expenseTitle ||
      !expenseAmount ||
      whoPaid.length === 0 ||
      whoHasToPay.length === 0
    ) {
      return;
    }

    const newExpense = {
      title: expenseTitle,
      amount: Number(expenseAmount),
      currency,
      whoPaid,
      whoHasToPay,
    };

    setExpenses([
      ...expenses,
      newExpense,
    ]);

    setExpenseTitle('');
    setExpenseAmount('');
    setWhoPaid([]);
    setWhoHasToPay([]);
  };

  // Compute owes list
  useEffect(() => {

    const transactions = [];

    expenses.forEach((expense) => {

      // Example:
      // A and B paid
      // C owes
      // Amount = 300

      // Total participants involved = 3
      // Share per person = 100

      const totalPeople =
        expense.whoPaid.length +
        expense.whoHasToPay.length;

      const sharePerPerson =
        expense.amount / totalPeople;

      expense.whoHasToPay.forEach((debtor) => {

        expense.whoPaid.forEach((payer) => {

          // Example:
          // C owes 100 total
          // Split to A and B
          // = 50 each

          const amountOwed =
            sharePerPerson /
            expense.whoPaid.length;

          transactions.push({
            from: debtor,
            to: payer,
            amount: amountOwed,
            currency: expense.currency,
          });

        });

      });

    });

    setOwesList(transactions);

  }, [expenses]);

  // Net balances
  const balances = useMemo(() => {

    const result = {};

    participants.forEach((p) => {
      result[p] = 0;
    });

    owesList.forEach((owe) => {

      result[owe.from] -= owe.amount;
      result[owe.to] += owe.amount;

    });

    return result;

  }, [participants, owesList]);

  // Edit owe amount
  const updateOweAmount = (
    index,
    value
  ) => {

    const updated = [...owesList];

    updated[index].amount =
      Number(value);

    setOwesList(updated);
  };

  // Delete owe
  const deleteOwe = (index) => {

    const updated =
      owesList.filter(
        (_, i) => i !== index
      );

    setOwesList(updated);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>
             {roomCode}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* Add Participant */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>
                Add Participant
              </h2>
            </IonText>

            <IonItem>
              <IonInput
                placeholder="Enter participant name"
                value={participantName}
                onIonChange={(e) =>
                  setParticipantName(
                    e.detail.value
                  )
                }
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={addParticipant}
            >
              + Add Participant
            </IonButton>

          </IonCardContent>
        </IonCard>

        {/* Add Expense */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>Add Expense</h2>
            </IonText>

            <IonItem>
              <IonLabel position="stacked">
                Expense Title
              </IonLabel>

              <IonInput
                placeholder="Dinner"
                value={expenseTitle}
                onIonChange={(e) =>
                  setExpenseTitle(
                    e.detail.value
                  )
                }
              />
            </IonItem>

            {/* Currency */}
            <IonItem>
              <IonLabel>
                Currency
              </IonLabel>

              <IonSelect
                value={currency}
                onIonChange={(e) =>
                  setCurrency(
                    e.detail.value
                  )
                }
              >

                {currencies.map((curr) => (
                  <IonSelectOption
                    key={curr}
                    value={curr}
                  >
                    {curr}
                  </IonSelectOption>
                ))}

              </IonSelect>
            </IonItem>

            {/* Amount */}
            <IonItem>
              <IonLabel position="stacked">
                Amount
              </IonLabel>

              <IonInput
                type="number"
                placeholder="300"
                value={expenseAmount}
                onIonChange={(e) =>
                  setExpenseAmount(
                    e.detail.value
                  )
                }
              />
            </IonItem>

          {/* Who Paid */}
<div
  style={{
    marginTop: '20px',
  }}
>

  <IonText>
    <h3>
      Who Paid?
    </h3>
  </IonText>

  {participants
    .filter(
      (person) =>
        !whoHasToPay.includes(person)
    )
    .map((person) => (

      <IonItem key={person}>

        <IonCheckbox
          checked={whoPaid.includes(
            person
          )}
          onIonChange={() =>
            toggleSelection(
              person,
              whoPaid,
              setWhoPaid
            )
          }
        />

        <IonLabel
          style={{
            marginLeft: '12px',
          }}
        >
          {person}
        </IonLabel>

      </IonItem>

    ))}

</div> 

{/* Who Has To Pay */}
<div
  style={{
    marginTop: '20px',
  }}
>

  <IonText>
    <h3>
      Who Has To Pay?
    </h3>
  </IonText>

  {participants
    .filter(
      (person) =>
        !whoPaid.includes(person)
    )
    .map((person) => (

      <IonItem key={person}>

        <IonCheckbox
          checked={whoHasToPay.includes(
            person
          )}
          onIonChange={() =>
            toggleSelection(
              person,
              whoHasToPay,
              setWhoHasToPay
            )
          }
        />

        <IonLabel
          style={{
            marginLeft: '12px',
          }}
        >
          {person}
        </IonLabel>

      </IonItem>

    ))}

</div>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={addExpense}
            >
              + Add Expense
            </IonButton>

          </IonCardContent>
        </IonCard>

        {/* Participants */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>
                👥 Participants
              </h2>
            </IonText>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
              }}
            >

              {participants.map((p) => (

                <div
                  key={p}
                  style={{
                    background: '#2a2a2a',
                    padding: '8px 14px',
                    borderRadius: '20px',
                  }}
                >
                  {p}
                </div>

              ))}

            </div>

          </IonCardContent>
        </IonCard>

        {/* Who Owes Who */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>
                💸 Who Owes Who
              </h2>
            </IonText>

            <IonList>

              {owesList.map(
                (owe, index) => (

                  <IonItem key={index}>

                    <IonLabel>

                      <strong>
                        {owe.from}
                      </strong>

                      {' → '}

                      <strong>
                        {owe.to}
                      </strong>

                    </IonLabel>

                    <IonInput
                      type="number"
                      value={owe.amount}
                      onIonChange={(e) =>
                        updateOweAmount(
                          index,
                          e.detail.value
                        )
                      }
                      style={{
                        maxWidth: '100px',
                      }}
                    />

                    <IonText
                      style={{
                        marginLeft: '8px',
                      }}
                    >
                      {owe.currency}
                    </IonText>

                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() =>
                        deleteOwe(index)
                      }
                    >
                      Delete
                    </IonButton>

                  </IonItem>

                )
              )}

            </IonList>

          </IonCardContent>
        </IonCard>

        {/* Net Balances */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>
                📊 Net Balances
              </h2>
            </IonText>

            <IonList>

              {Object.entries(
                balances
              ).map(
                ([name, amount]) => (

                  <IonItem key={name}>

                    <IonLabel>
                      <strong>
                        {name}
                      </strong>
                    </IonLabel>

                    <IonText
                      color={
                        amount >= 0
                          ? 'success'
                          : 'danger'
                      }
                    >
                      <strong>

                        {amount >= 0
                          ? '+'
                          : ''}

                        {currency}
                        {' '}

                        {amount.toFixed(2)}

                      </strong>
                    </IonText>

                  </IonItem>

                )
              )}

            </IonList>

          </IonCardContent>
        </IonCard>

        {/* Expenses */}
        <IonCard>
          <IonCardContent>

            <IonText>
              <h2>
                🧾 Expenses
              </h2>
            </IonText>

            <IonList>

              {expenses.map(
                (
                  expense,
                  index
                ) => (

                  <IonItem key={index}>

                    <IonLabel>

                      <h2>
                        {
                          expense.title
                        }
                      </h2>

                      <p>

                        {
                          expense.currency
                        }

                        {' '}

                        {
                          expense.amount
                        }

                      </p>

                      <p>

                        Paid by:{' '}

                        {
                          expense.whoPaid.join(
                            ', '
                          )
                        }

                      </p>

                      <p>

                        Shared with:{' '}

                        {
                          expense.whoHasToPay.join(
                            ', '
                          )
                        }

                      </p>

                    </IonLabel>

                  </IonItem>

                )
              )}

            </IonList>

          </IonCardContent>
        </IonCard>

      {/* Settled */}
<IonButton
  expand="block"
  size="large"
  color="success"
  className="ion-margin-bottom"
  onClick={() => history.push('/')}
>
  Settled
</IonButton>

      </IonContent>

    </IonPage>
  );
}
