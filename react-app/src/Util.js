
export default function sendMessageToRef(ref, message) {
    console.log('ref: ', ref, 'message: ', message);
    ref.current.handleMessage(message);
}
