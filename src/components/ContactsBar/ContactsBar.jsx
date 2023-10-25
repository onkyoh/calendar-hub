import React, { useState } from "react";

import ContactItem from "./ContactItem";
import IncomingItem from "./IncomingItem";

import AddIcon from "@iconscout/react-unicons/icons/uil-user-plus";
import CopyIcon from "@iconscout/react-unicons/icons/uil-copy";
import UpIcon from "@iconscout/react-unicons/icons/uil-angle-up";
import DownIcon from "@iconscout/react-unicons/icons/uil-angle-down";
import LeaveIcon from "@iconscout/react-unicons/icons/uil-sign-out-alt";

import useAddContact from "../../hooks/useAddContact";
import useIsDeleting from "../../hooks/useIsDeleting";
import useShow from "../../hooks/useShow";

import { accept, deny, deleteContact } from "../../utils/contactsUtil";
import { logout } from "../../utils/logout";

const ContactsBar = (props) => {
  const { contactId, handleContactId, addContact } = useAddContact(
    props.contacts
  );
  const { deletingId, toggleDelete } = useIsDeleting();
  const { show, toggleShow } = useShow();

  const userContactInfo = {
    usersName: props.displayName,
    usersCalendar: props.calendarId,
    usersId: props.userId,
  };

  return (
    <aside className={show.bar ? "slide-up" : ""}>
      <section id="profile">
        <div>
          <h4>{props.displayName}</h4>
          <button onClick={() => toggleShow("logout")}>
            <LeaveIcon />
          </button>
        </div>
        <div>
          <p
            onClick={() => {
              navigator.clipboard.writeText(props.userId);
            }}
          >
            id:{props.userId}
            <CopyIcon />
          </p>
        </div>
        <div>
          <input
            type="text"
            value={contactId}
            onChange={(e) => handleContactId(e)}
          />
          <button onClick={() => addContact(userContactInfo, contactId)}>
            <AddIcon />
          </button>
        </div>
      </section>

      {show.logout && (
        <div>
          <div className="modals">
            <h3>logout confirmation</h3>
            <p>are you sure you would like to logout?</p>
            <button onClick={() => logout(props.handleCurrentUser)}>
              logout
            </button>
            <button onClick={() => toggleShow("logout")}>cancel</button>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="modals">
          <h3>delete contact confirmation</h3>
          <p>
            are you sure you would like to delete this contact? once you do, you
            will not be able to undo this action.
          </p>
          <button
            onClick={() =>
              deleteContact(props.userId, deletingId, toggleDelete)
            }
          >
            confirm
          </button>
          <button onClick={() => toggleDelete()}>cancel</button>
        </div>
      )}

      <section id="contacts">
        <div id="requests">
          <p onClick={() => toggleShow("requests")}>
            {show.requests ? "-" : "+"} requests
          </p>
          {show.requests && (
            <ul>
              {props.incomingRequests &&
                props.incomingRequests.map((incomingUser) => (
                  <IncomingItem
                    accept={accept}
                    deny={deny}
                    incomingUser={incomingUser}
                    userContactInfo={userContactInfo}
                    key={incomingUser.usersId}
                  />
                ))}
            </ul>
          )}
        </div>

        <div id="added">
          <p onClick={() => toggleShow("added")}>
            {show.added ? "-" : "+"} contacts{" "}
          </p>
          {show.added && (
            <ul>
              {props.contacts &&
                props.contacts.map((contact) => (
                  <ContactItem
                    contact={contact}
                    switchCalendar={props.switchCalendar}
                    calendarId={props.calendarId}
                    toggleDelete={toggleDelete}
                    key={contact.usersId}
                  />
                ))}
            </ul>
          )}
        </div>
        <div id="toggle">
          <button onClick={() => toggleShow("bar")}>
            {show.bar ? <DownIcon /> : <UpIcon />}
          </button>
        </div>
      </section>
    </aside>
  );
};

export default ContactsBar;
