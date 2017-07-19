module.exports = function(input){
  let grade = [];
  input.forEach( function(num){
    if(num.Score > 85) { grade.push('A')
  } else if (num.Score > 70) { grade.push('B')
} else if (num.Score > 55) { grade.push('C')
    } else if ( num.Score > 0 && num.Score <= 55) { grade.push('E')
  } else if (num.Score == null) { grade.push('empty')
    } else { grade.push('empty') }
  })
  return grade;
}
