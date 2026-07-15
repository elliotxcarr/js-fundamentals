## Open/Closed Principle
Software entites should be open for extension but closed for modification. If someone wants to extend a modules behaviour, they wont need to modify existing code that they dont want to

```js
const employees = [
  {
    name: 'John',
    level: 'mid',
  },
  {
    name: 'Dave',
    level: 'senior',
  },
  {
    name: 'Laura',
    level: 'junior',
  },
  {
    name: 'Debbie',
    level: 'lead',
  },
]
```

BAD:

```js
const calculateSalary = (employee) => {
  const BASE = 130000;
  switch (employee.level) {
    case 'junior':
      return BASE + 1000
      break;
    
    case 'mid':
      return BASE + 3000
      break;

    case 'senior':
      return BASE + 5000;
      break;
    
    // Open/close principle must be broken here to accomodate new level
  }
}
```

This will break when trying to calculate Debbies salary as there is no case for 'lead' level
```js
{ name: 'Debbie', level: 'lead', salary: undefined }
```

GOOD (behavior driven):

```js
const employees = [
  {
    name: 'John',
    level: new MidLevel(),
  },
  {
    name: 'Dave',
    level: new SeniorLevel(),
  },
  {
    name: 'Laura',
    level: new JuniorLevel(),
  },
  {
    name: 'Debbie',
    level: new LeadLevel(),
  },
]

class JuniorLevel {
  adjustment = 1000;
  calcSalary(base) {
    return base + this.adjustment;
  }
}

class MidLevel {
  adjustment = 3000;
  calcSalary(base) {
    return base + this.adjustment;
  }
}

class SeniorLevel {
  adjustment = 5000;
  calcSalary(base) {
    return base + this.adjustment;
  }
}

class LeadLevel {
  adjustment = 7000;
  calcSalary(base) {
    return base + this.adjustment;
  }
}

const calculateSalary = (employee) => {
  const BASE = 130000;
  return employee.level.calcSalary(BASE);
}

employees.forEach(employee => {
  employee.salary = calculateSalary(employee)
  console.log(employee)
})

```
To add a new level, create a new class and calculateSalary remains unchanged. This removes the brittle switch statment

This also implements the Strategy pattern 
- it uses a family of interchangeable algorithms (level classes) each with the same interface (calcSalary)
- Uses a context (calculateSalary) that will use the strategy the object holds (JuniorLevel, SeniorLevel etc.)

Another example (Data driven):

```js
const salaryAdjusters = new Map([
  ['junior', 1000],
  ['mid', 3000],
  ['senior', 5000],
])

const calculateSalary = (employee) => {
  const BASE = 130000;
  const adjustment = salaryAdjusters.get(employee.level);
  if (!adjustment) throw new Error('Unknown employee level')
  return BASE + adjustment;
}

const registerSalaryLevel = (level, amount) => {
  salaryAdjusters.set(level, amount);
}

registerSalaryLevel('lead', 7000);

employees.forEach(employee => {
  employee.salary = calculateSalary(employee)
  console.log(employee)
})
```

Here we allow a new salary level to be added dynamically