import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notiflix from 'notiflix';
import styles from './styles.module.css';
const LOCALSTORAGE_KEY = 'contacts';

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  fontSize: '20px',
  timeout: 4000,
});

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage(LOCALSTORAGE_KEY, []);

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const addContacts = data => {
    const { name } = data;
    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      return Notiflix.Notify.info(`${name} is already in contacts`);
    }
    setContacts(prevContacts => [...prevContacts, data]);
  };

  const handleFilter = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = e => {
    const elementToRemove = e.currentTarget.parentNode.id;
    let elementToContacts = contacts.filter(
      contact => contact.id !== elementToRemove
    );
    setContacts(elementToContacts);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        getVisibleContacts={handleFilter()}
        deleteContact={handleDelete}
      />
    </div>
  );
};
