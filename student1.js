// Вам нужно сделать конструктор сущности Студент.
//     У Студента есть имя, фамилия, год рождения — это свойства. Есть массив с оценками, это тоже свойство.
//     И есть возможность получить возраст студента и его средний бал — это методы.
//
//     Еще у всех Студентов есть по массиву одинаковой длины, в нем 25 элементов, изначально он не заполнен,
//     но на 25 элементов. Это массив в котором отмечается посещаемость, каждый раз когда мы вызываем метод .present()
// на очередное пустое место в массив записывается true, когда вызываем .absent() — записывается false. Предусмотрите
// какую нибудь защиту от того чтоб в массиве посещаемости не могло быть более 25 записей. Массив это свойство, present
// и absent — методы.
//
//     Ну и последний метод: .summary(), он проверяет среднюю оценку, и среднее посещение(количествоПосещений/
//     количествоЗанятий), и если средняя оценка больше 90 а среднее посещение больше 0.9, то метод summary,
//     возвращает строку "Ути какой молодчинка!", если одно из этих значений меньше, то — "Норм, но можно лучше",
//     если оба ниже — "Редиска!".
//
//     Ну и не забудьте после того как напишите замечательный конструктор, создать пару экземпляров(конкретных студентов)
// и подергать методы.

"use strict";
var StudentMethods = function() {
    this.getAge = function() {
        var today = new Date();
        var birthDate = new Date(this.dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();

        if (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    this.getAverageGrade = function() {
        if (this.grades.length) {
            var sumOfGrades = this.grades.reduce(function(prevResult, currentValue){
                return prevResult + currentValue;
            });

            return sumOfGrades / this.grades.length;
        } else {
            return 0;
        }
    };

    this.present = function() {
        for (var i = 0; i < this.attendance.length; i++) {
            if (typeof this.attendance[i] === 'undefined') {
                this.attendance[i] = true;
                break;
            }
        }
    };

    this.absent = function() {
        for (var i = 0; i < this.attendance.length; i++) {
            if (typeof this.attendance[i] === 'undefined') {
                this.attendance[i] = false;
                break;
            }
        }
    };

    this.summary = function() {
        var averageGrade = this.getAverageGrade();
        var presents = 0;

        for(var i = 0; i < this.attendance.length; i++) {
            if (this.attendance[i]) {
                presents++;
            }
        }

        var averageAttendance = presents / this.attendance.length;

        if (averageGrade > 90 && averageAttendance > .9) {
            return "Ути какой молодчинка!";
        }

        if (averageGrade > 90 || averageAttendance > .9) {
            return "Норм, но можно лучше";
        } else {
            return "Редиска!";
        }
    };
};

var Student = function(name, surname, dateOfBirth) {
    StudentMethods.call(this);

    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.grades = [];
    this.attendance = new Array(25);
};

function setGrades(student) {
    var gradesCount = Math.floor(Math.random()*10);

    for (var i = 0; i < gradesCount; i++) {
        student.grades[student.grades.length] = 60 + Math.floor(Math.random()*40);
    }
}

function setPresence(student) {
    for (var i = 0; i < student.attendance.length; i++) {
        var presence = Math.floor(Math.random() * 10);

        presence >= 3 ? student.present() : student.absent();
    }
}

var vasya = new Student('Vasya', 'Vasychkin', '1998-02-12');
setGrades(vasya);
setPresence(vasya);

console.log(
    vasya.name,
    vasya.surname,
    vasya.dateOfBirth,
    vasya.grades,
    vasya.getAge(),
    vasya.getAverageGrade()
);

console.log(
    vasya.attendance,
    vasya.summary()
);

var olya = new Student('Olya', 'Vasychkina', '1999-12-10');
setGrades(olya);
setPresence(olya);

// console.log(
//     olya.name,
//     olya.surname,
//     olya.dateOfBirth,
//     olya.grades,
//     olya.getAge(),
//     olya.getAverageGrade(),
//     olya.attendance,
//     olya.summary()
// );

// Создать конструктор массива, который будет содержать объекты из прошлого задания на прототипы.
// Массивы созданные с помощью этого конструктора должны содержать следующие методы:
//  .attendance — если вызывается без аргумента, то возвращает среднюю посещаемость группы за одно занятие;
// если с аргументом — строкой содержащей фамилию одного из студентов, то возвращает его место в рейтинге посещаемости
//  .performance — то же самое, но с оценками

function createGroup() {
    var group = [];
    var groupAttendence = [];

    for (var i = 0; i < arguments.length; i++) {
        group[i] = arguments[i];
    }

    group.attendance = function(surname) {
        var sumPresence = 0;

        for (var i = 0; i < this.length; i++) {
            var presence = 0;

            for(var j = 0; j < this[i].attendance.length; j++) {
                if (this[i].attendance[j]) {
                    presence++;
                    sumPresence++;
                }
            }

            groupAttendence[groupAttendence.length] = {
                surname: this[i].surname,
                attendence: presence / this[i].attendance.length
            };
        }

        if (!surname) {
            return sumPresence / (this.length * this[0].attendance.length);
        } else {
            groupAttendence.sort(function(a, b){
                return a.attendence > b.attendence ? -1 : 1;
            });
            console.log(groupAttendence);
        }
    };

    group.performance = function() {

    };

    return group;
}

var myGroup = createGroup(vasya, olya);
console.log(myGroup.attendance('Vasychkina'));
