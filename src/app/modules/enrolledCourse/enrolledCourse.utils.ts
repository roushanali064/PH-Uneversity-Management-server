export const calculateGrade = (totalMarks: number) =>{
    let result = {
        grade: 'NA',
        gradePoint: 0
    };
    if(totalMarks > 0 && totalMarks <= 19){
        result={
            grade: 'F',
            gradePoint: 0.00
        }
    } else if(totalMarks > 19 && totalMarks <= 39){
        result={
            grade: 'D',
            gradePoint: 2.00
        }
    } else if(totalMarks > 39 && totalMarks <= 59){
        result={
            grade: 'C',
            gradePoint: 3.00
        }
    }else if(totalMarks > 59 && totalMarks <= 79){
        result={
            grade: 'B',
            gradePoint: 3.00
        }
    }else if(totalMarks > 79 && totalMarks <= 100){
        result={
            grade: 'A',
            gradePoint: 4.00
        }
    }

    return result
}