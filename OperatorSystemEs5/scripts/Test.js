let manager = new Manager();
var tariff1 = new Tariff('Simple Tariff', ['short'], 30);

var tariff2 = new Tariff('All inclusive', ['short', 'middle', 'large', 'extra large'], 100);
var user1 = new User('097654', 568);
var user2 = new User('089', 8945);
var mess1 = new Message('089', '097654', 'mess1');
var mess2 = new Message('097654', '089', 'mesjhkhs1');
var mess3 = new Message('097654', '089', 'meshbmbhs1');

var mess4 = new Message('097654', '089', 'bodykjfffffffffffffffffsfdsfsfsfdffggddddddddgfdddddddddddgfdfgfkjkjkjmess2');

manager.addTariff(tariff2);
manager.addTariff(tariff1);
manager.addUser(user1);
manager.addUser(user2);
manager.setUserTariff('097654', 'Simple Tariff');
manager.setUserTariff('089', 'All inclusive');
manager.withdrawPayOfTariff('097654');
manager.withdrawPayOfTariff('089');
//manager.addUser(user2);
//manager.addMessage(mess1);
// manager.sendMessage(mess2)
// manager.sendMessage(mess3)
// manager.sendMessage(mess1)
// manager.sendMessage(mess4)
// manager.sendMessage(mess3)

//manager.addMessage(mess1);

function handler(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log('Received messages:', data)
    };
}

manager.sendMessage(mess1, function(err, data) {
    handler(err, data);
    manager.sendMessage(mess2, function(err, data) {
        handler(err, data);
        manager.sendMessage(mess3, function(err, data) {
            handler(err, data);
            manager.sendMessage(mess4, function(err, data) {
                handler(err, data);
            })
        });
    });
});