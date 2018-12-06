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

class Student {
    public grades: number[] = [];
    public attendance: boolean[] = new Array(25);

    constructor(public name: string, public surname: string, protected dateOfBirth: string) {
        this.name = name;
        this.surname = surname;
    }

    public getAge(): number {
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);

        const age = (today.getMonth() < birthDate.getMonth() ||
            today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ? today.getFullYear() - birthDate.getFullYear() - 1
            : today.getFullYear() - birthDate.getFullYear();

        return age;
    }

    public getAverageGrade(): number {
        if (this.grades.length) {
            const sumOfGrades = this.grades.reduce(function(prevResult, currentValue){
                return prevResult + currentValue;
            });

            return sumOfGrades / this.grades.length;
        } else {
            return 0;
        }
    }

    public present(): void {
        const index = [...this.attendance].indexOf(undefined);

        if (index !== -1) {
            this.attendance[index] = true;
        }
    }

    public absent(): void {
        const index = [...this.attendance].indexOf(undefined);

        if (index !== -1) {
            this.attendance[index] = false;
        }
    }

    public summary(): string {
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

    public setGrades(): void {
        const gradesArr = new Array (Math.floor(Math.random()*10));

        this.grades = [...gradesArr].map(() => 60 + Math.floor(Math.random()*40));
    }

    public setPresence(): void {
        [...this.attendance].forEach(() => {
            const presence = Math.floor(Math.random() * 10);

            presence >= 3 ? this.present() : this.absent();
        })
    }
}

const vasya = new Student('Vasya', 'Vasychkin', '1998-02-12');
vasya.setGrades();
vasya.setPresence();

console.log(
    vasya.name,
    vasya.surname,
    vasya.grades,
    vasya.getAge(),
    vasya.getAverageGrade(),
    vasya.attendance,
    vasya.summary()
);

const olya = new Student('Olya', 'Vasychkina', '1999-12-10');
vasya.setGrades();
vasya.setPresence();




class Group {
    public group: any;

    constructor() {
        this.group = [...arguments];
        this.setMethodsToGroup();

        return this.group;
    }

    public setMethodsToGroup(): void {
        this.group.__proto__ = {};
        this.group.performance = this.performance;
    }

    public attendance (surname?: string): number {
        const groupAttendence = this.group.map(item => {
            const presence = item.attendance.filter(Boolean).length;

            return {
                surname: item.surname,
                attendance: presence / item.attendance.length
            };
        });

        if (!surname) {
            return groupAttendence.reduce((accum, item) => {
                return accum + item.attendance;
            }, 0) / groupAttendence.length;
        } else {
            return groupAttendence
                .sort((a,b) =>  b.attendance - a.attendance)
                .findIndex(item => item.surname === surname) + 1;
        }
    }

    public performance (surname?: string): number {
        if (!surname) {
            return this.group.reduce(function(accum, item) {
                return accum + item.getAverageGrade();
            }, 0) / this.group.length;
        } else {
            return this.group
                .sort((a,b) =>  b.getAverageGrade() - a.getAverageGrade())
                .findIndex(item => item.surname === surname) + 1;
        }
    }

}

var group = new Group(vasya, olya);

console.log(group);
console.log(group.attendance());
console.log(group.performance());