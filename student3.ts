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

class StudentMethods {
    constructor(protected dateOfBirth: string) {
        this.dateOfBirth = dateOfBirth;
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

    public getAverageGrade(grades: number[]): number {
        if (grades.length) {
            const sumOfGrades = grades.reduce(function(prevResult, currentValue){
                return prevResult + currentValue;
            });

            return sumOfGrades / grades.length;
        } else {
            return 0;
        }
    }

    public present(attendance: boolean[]): void {
        const index = [...attendance].indexOf(undefined);

        if (index !== -1) {
            attendance[index] = true;
        }
    }

    public absent(attendance: boolean[]): void {
        const index = [...attendance].indexOf(undefined);

        if (index !== -1) {
            attendance[index] = false;
        }
    }

    public summary(grades: number[], attendance: boolean[]): string {
        const averageGrade = this.getAverageGrade(grades);
        const presents = attendance.filter(Boolean).length;
        const averageAttendance = presents / attendance.length;

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

class Student extends StudentMethods {
    public grades: number[] = [];
    public attendance: boolean[] = new Array(25);

    constructor(public name: string, public surname: string, protected dateOfBirth: string) {
        super(dateOfBirth);

        this.name = name;
        this.surname = surname;
    }

    public setGrades(): void {
        const gradesArr = new Array (Math.floor(Math.random()*10));

        this.grades = [...gradesArr].map(() => 60 + Math.floor(Math.random()*40));
    }

    public setPresence(): void {
        [...this.attendance].forEach(() => {
            const presence = Math.floor(Math.random() * 10);

            presence >= 3 ? this.present(this.attendance) : this.absent(this.attendance);
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
    vasya.getAverageGrade(vasya.grades),
    vasya.attendance,
    vasya.summary(vasya.grades, vasya.attendance)
);

