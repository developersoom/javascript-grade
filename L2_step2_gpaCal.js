const data = [{
        'name': '데이터베이스',
        'grade': 'A',
        'credit': 3,
        'major': false
    },
    {
        'name': '교양영어',
        'grade': 'B',
        'credit': 2,
        'major': true
    },
    {
        'name': '철학',
        'grade': 'B+',
        'credit': 1,
        'major': false
    },
    {
        'name': '경영',
        'grade': 'A+',
        'credit': 3,
        'major': true
    },
    {
        'name': '통계',
        'grade': 'A+',
        'credit': 2,
        'major': true
    },
];

const fourPointFiveTable = {
    'A+': 4.5,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0,
}

function addLecture(newLecture) {
    const newData = data;
    newData.push(newLecture);
    const result = gpaCalculator(newData, 4.5);
    console.log(result);
}

function removeLecture(lecture, time) {
    setTimeout(function () {
        const newData = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].name !== lecture) {
                newData.push(data[i]);
            }
        }
        const result = gpaCalculator(newData, 4.5);
        console.log(result);
    }, time);
}

function calculateCredits(dataArr) {
    let grossCredits = 0;
    let grossMajorCredits = 0;
    for (const key in dataArr) {
        grossCredits += dataArr[key].credit;
        if (dataArr[key].major) {
            grossMajorCredits += dataArr[key].credit;
        }
    }
    return [grossCredits, grossMajorCredits];
}

function calculatePoints(dataArr) {
    let grossPoints = 0;
    let grossMajorPoints = 0;

    for (const i in dataArr) {
        grossPoints += (dataArr[i].credit * fourPointFiveTable[dataArr[i]['grade']]);
        if (dataArr[i].major) {
            grossMajorPoints += dataArr[i].credit * fourPointFiveTable[dataArr[i]['grade']];
        }
    }

    return [grossPoints, grossMajorPoints];
}

function getValues(dataArr) {
    const values = {};
    const elements = [calculateCredits(dataArr)[0], calculateCredits(dataArr)[1], calculatePoints(dataArr)[0], calculatePoints(dataArr)[1], parseFloat((calculatePoints(dataArr)[0] / calculateCredits(dataArr)[0]).toFixed(2)), parseFloat((calculatePoints(dataArr)[1] / calculateCredits(dataArr)[1]).toFixed(2))];
    [values.grossCredits, values.grossMajorCredits, values.grossPoints, values.grossMajorPoints, values.gpa, values.mgpa] = elements;
    return values;
}

function gpaCalculator(dataArr, scale) {
    const values = getValues(dataArr);
    const template =
        `
    ${scale.toFixed(1)} 기준: 총 평점 = ${((values.gpa) * (scale / 4.5)).toFixed(2)} 전공 평점 = ${((values.mgpa) * (scale / 4.5)).toFixed(2)}
    이수 학점: ${values.grossCredits}
    전공 이수 학점: ${values.grossMajorCredits}`
    return template;
}

function sortGrade(dataArr) {
    for (i = 0; i < dataArr.length; i++) {
        dataArr[i].gradePoint = fourPointFiveTable[dataArr[i]['grade']];
    }
    dataArr.sort(function (a, b) {
        return b.gradePoint - a.gradePoint;
    });
    for (i = 0; i < dataArr.length; i++) {
        for (j = 0; j < dataArr.length; j++) {
            if (dataArr[i]['grade'] === dataArr[j]['grade'] && dataArr[i]['credit'] > dataArr[j]['credit']) {
                let temp = dataArr[i];
                dataArr[i] = dataArr[j];
                dataArr[j] = temp;
            }
        }
    }
    return dataArr;
}

function print(dataArr) {
    let data = sortGrade(dataArr);
    let output = "";
    output += `-----------------------------------------\n`
    for (i = 0; i < data.length; i++) {
        output += `${data[i]['name']}, ${data[i]['grade']}, ${data[i]['credit']}학점\n`
    }
    output += `-----------------------------------------`;
    return output;
}

/*
addLecture({
    'name': '알고리즘',
    'grade': 'B',
    'credit': 3,
    'Major': true
});

removeLecture('철학', 2000); // 2초뒤에 다시 결과 출력
*/

/*
function sortGrade(data) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data.length; j++) {
            if (data[i]['grade'] < data[j]['grade']) {
                // console.log(data[i]['grade']+' < '+data[j]['grade'])
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            } else if (data[i]['grade'] === data[j]['grade'] && data[i]['credit'] > data[j]['credit']) {
                let temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    return data;
}
*/