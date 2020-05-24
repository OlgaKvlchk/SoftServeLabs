let tariff1 = new Tariff('Simple Tariff', [MessageType.short], 30);
let tariff2 = new Tariff('All inclusive', [MessageType.middle, MessageType.short, MessageType.large, MessageType.extraLarge], 100);

let user1 = new User("098", 654);
let user2 = new User('089', 8945);
let user3 = new User('097654', 945);

let mess1 = new Message('089', '097654', 'mess1');
let mess2 = new Message('097654', '089', 'mesjhkhs1');
let mess3 = new Message('098', '089', 'meshbmbhs1');
let mess4 = new Message('097654', '089', 'bodykjfffffffffffffffffsfdsfsfsfdffggddddddddgfdddddddddddgfdfgfkjkjkjmess2');

let tariffList = new List<ITarifable>();
let userList = new List<IUserable>();
let messageList = new List<IMessagable>();

let manager = new Manager(tariffList, userList, messageList);

console.log(user1, user2, user3, tariff1, tariff2, mess1, mess2, mess3, mess4);

manager.addTariff(tariff1);
manager.addTariff(tariff2);
manager.addUser(user1);
manager.addUser(user2);
manager.addUser(user3);
manager.withdrawPayOfTariff('097654');
manager.withdrawPayOfTariff('089');

console.log(manager);

console.log(manager.getTariffByName("All inclusive"));
// //manager.deleteTariffByName('All inclusive');
// manager.getTariffByName('Simple Tariff');
// manager.addUser(user1);
// manager.addUser(user2);
// manager.getUserByPhone('097654');
// //manager.deleteUserByPhone('097654');
// manager.getUserTariff('089');
// manager.setUserTariff('097654', 'Simple Tariff');
// manager.setUserTariff('089', 'All inclusive');
// manager.getUserBalance('097654');
// manager.addUserBalance('089', 800);
// manager.withdrawPayOfTariff('097654');
// manager.withdrawPayOfTariff('089');
// manager.getTariffById(1);
// manager.getUserById(1);
// manager.getMessageById(2);
// // manager.addMessage(mess1);
// // manager.addMessage(mess2);
// // manager.addMessage(mess3);
// // manager.addMessage(mess4);
// // manager.getMessageById(1);
// // manager.getRecieverMessages('097654');
// // manager.getCreatorMessages('089');
// //manager.deleteMessageById(1);
// //manager.sendMessage(mess2)
// // manager.sendMessage(mess3)
// // manager.sendMessage(mess1)
// // manager.sendMessage(mess4)
// // manager.sendMessage(mess3)


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
    //.finally(() => console.log('The Promise is finished'))

// async function sendMess(mess) {
//     const data = await manager.sendMessage(mess);
//     console.log(data);
// }

// // (async() => {
// //     try {
// //         await sendMess(mess1);
// //         await sendMess(mess2);
// //         await sendMess(mess3);
// //         await sendMess(mess4);
// //     } catch (err) {
// //         console.log(err);
// //     } finally {
// //         () => console.log('The Promise is finished');
// //     }
// // })()

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