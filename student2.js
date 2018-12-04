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
class StudentMethods {
    getAge() {
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);

        const age = (today.getMonth() < birthDate.getMonth() ||
            today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ? today.getFullYear() - birthDate.getFullYear() - 1
            : today.getFullYear() - birthDate.getFullYear();

        return age;
    }

    getAverageGrade() {
        if (this.grades.length) {
            const sumOfGrades = this.grades.reduce(function(prevResult, currentValue){
                return prevResult + currentValue;
            });

            return sumOfGrades / this.grades.length;
        } else {
            return 0;
        }
    }

    present() {
        const index = [...this.attendance].indexOf(undefined);

        if (index !== -1) {
            this.attendance[index] = true;
        }
    }

    absent() {
        const index = [...this.attendance].indexOf(undefined);

        if (index !== -1) {
            this.attendance[index] = false;
        }
    }

    summary() {
        const averageGrade = this.getAverageGrade();
        const presents = this.attendance.filter(Boolean).length;
        const averageAttendance = presents / this.attendance.length;

        if (averageGrade > 90 && averageAttendance > .9) {
            return "Ути какой молодчинка!";
        }

        if (averageGrade > 90 || averageAttendance > .9) {
            return "Норм, но можно лучше";
        } else {
            return "Редиска!";
        }
    }
}

class Student extends StudentMethods{
    constructor(name, surname, dateOfBirth) {
        super();

        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.grades = [];
        this.attendance = new Array(25);
    }
}

const setGrades = student => {
    const gradesArr = new Array (Math.floor(Math.random()*10));

    student.grades = [...gradesArr].map(() => 60 + Math.floor(Math.random()*40));
};

const setPresence = student => {
    [...student.attendance].forEach(() => {
        const presence = Math.floor(Math.random() * 10);

        presence >= 3 ? student.present() : student.absent();
    })
};

const vasya = new Student('Vasya', 'Vasychkin', '1998-02-12');
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

// var olya = new Student('Olya', 'Vasychkina', '1999-12-10');
// setGrades(olya);
// setPresence(olya);

// console.log(
//     olya.name,
//     olya.surname,
//     olya.dateOfBirth,
//     olya.grades,
//     olya.getAge(),
//     olya.getAverageGrade()
// );

// console.log(
//     olya.attendance,
//     olya.summary()
// );
