let tariff1 = new Tariff('Simple Tariff', [MessageType.short], 30);
let tariff2 = new Tariff('All inclusive', [MessageType.short, MessageType.middle, MessageType.large, MessageType.extraLarge], 200);
let tariff4 = new Tariff('Middle', [MessageType.short, MessageType.middle], 150 )
let tariff3 = new Tariff('Extra grand', [MessageType.large, MessageType.short, MessageType.middle], 322);

let user1 = new User('098', 654);
let user2 = new User('089', 8945);
let user3 = new User('097654', 945);

let mess1 = new Message('098', '097654', 'mess1');
let mess2 = new Message('097654', '098', 'mesjhkhs1hjk');
let mess3 = new Message('089', '097654', 'meshbmbhs1');
let mess4 = new Message('098', '089', 'bodykjfffffffffffffffffsfdsfsfsfdffggddddddddgfdddddddddddgfdfgfkjkjkjmess2');

let tariffList = new List<ITarifable>();
let userList = new List<IUserable>();
let messageList = new List<IMessagable>();

let manager = new Manager(tariffList, userList, messageList);

console.log(user1, user2, user3, tariff1, tariff2, tariff3, tariff4, mess1, mess2, mess3, mess4);

manager.addTariff(tariff1);
manager.addTariff(tariff2);
manager.addTariff(tariff3);
manager.addTariff(tariff4);
manager.addUser(user1);
manager.addUser(user2);
manager.addUser(user3);


console.log(manager.tariffList);//getter

console.log(manager.getTariffById(1));
console.log(manager.getTariffById(4)); //null

console.log(manager.getTariffByName("All")); //null

console.log(manager.getTariffByName('Extra grand'));
manager.deleteTariffByName('Extra grand');
console.log(manager.getTariffByName('Extra grand')); //null


console.log(manager.getUserById(1));
console.log(manager.getUserById(10)); // null

console.log(manager.getUserByPhone('098'));
console.log(manager.getUserByPhone('228322')); // null

manager.deleteUserByPhone('089');
console.log(manager.getUserByPhone('089'));

console.log(manager.getUserTariff('098')); // null

manager.setUserTariff('098', 'All inclusive');
console.log(manager.getUserTariff('098'));

console.log(manager.getUserBalance('098'));

manager.addUserBalance('098', 1000);
console.log(manager.getUserBalance('098'));

manager.withdrawPayOfTariff('098');
console.log(manager.getUserBalance('098'));


manager.addMessage(mess1);

console.log(manager.getMessageById(1)); 
console.log(manager.getMessageById(5)); //null

console.log(manager.getCreatorMessages('098'));
console.log(manager.getRecieverMessages('097654'));

manager.deleteMessageById(1);

manager.setUserTariff('097654', 'Middle');
console.log(manager.getUserTariff('097654'));
manager.withdrawPayOfTariff('097654');

//console.log(manager.isAvialableMessageType(mess1));

manager.sendMessage(mess1)
    .then(data => {
        console.log('Received messages:', data);
        return manager.sendMessage(mess2);
    })
    .then(data => {
        console.log('Received messages:', data);
        return manager.sendMessage(mess3);
    })
    .then(data => console.log('Received messages:', data))
    .catch(err => console.log(err))

// async function sendMess(mess: IMessagable) {
//     const data = await manager.sendMessage(mess);
//     console.log(data);
// }

// (async() => {
//     try {
//         await sendMess(mess1);
//         await sendMess(mess2);
//         await sendMess(mess3);
//         await sendMess(mess4);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         () => console.log('The Promise is finished');
//     }
// })();

// // try {
// //     manager.sendMessage(mess1)
// //         .then(data => console.log('Received messages:', data),
// //             manager.sendMessage(mess2))
// //         .then(data => console.log('Received messages:', data),
// //             manager.sendMessage(mess2))
// //         .then(data => console.log('Received messages:', data))  
// // } catch (e) {
// //     console.log(e);
// // }