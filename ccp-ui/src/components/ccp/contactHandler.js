export function contactHandler(contactHook, dispatch, contactRef) {
  //CCP assigned contact id
  const assignedContactId = contactHook.getContactId();
  dispatch({ type: "NEW_CONTACT", payload: assignedContactId });
  console.log("Contact received:", assignedContactId);

  contactHook.onConnecting(() => {
    dispatch({ type: "CALL_CONNECTING" });
    console.log("Contact connecting");
  });

  contactHook.onConnected(() => {
    dispatch({ type: "CALL_CONNECTED" });
    console.log("Contact connected");
  });

  contactHook.onEnded(() => {
    console.log("Contact ended");
    dispatch({ type: "CALL_ENDED" });
    contactRef.current = null;
  });
}
