DROP DATABASE IF EXISTS TechNovaDB;
CREATE DATABASE TechNovaDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE TechNovaDB;

CREATE TABLE Department (
  DeptID INT PRIMARY KEY,
  DeptName VARCHAR(100) NOT NULL UNIQUE,
  Location VARCHAR(100)
) ENGINE=InnoDB;

CREATE TABLE Employee (
  EmpID INT PRIMARY KEY AUTO_INCREMENT,
  EmpName VARCHAR(150) NOT NULL,
  Gender ENUM('M','F','O') DEFAULT 'O',
  DOB DATE NOT NULL,
  HireDate DATE NOT NULL,
  DeptID INT NOT NULL,
  CONSTRAINT fk_emp_dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Project (
  ProjectID INT PRIMARY KEY AUTO_INCREMENT,
  ProjectName VARCHAR(150) NOT NULL,
  DeptID INT NOT NULL,
  StartDate DATE,
  EndDate DATE,
  CONSTRAINT fk_proj_dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE KEY uniq_project_dept (ProjectName, DeptID)
) ENGINE=InnoDB;

CREATE TABLE Performance (
  PerfID INT PRIMARY KEY AUTO_INCREMENT,
  EmpID INT NOT NULL,
  ProjectID INT NOT NULL,
  Rating DECIMAL(3,2) NOT NULL CHECK (Rating BETWEEN 0 AND 5),
  ReviewDate DATE NOT NULL,
  CONSTRAINT fk_perf_emp FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_perf_proj FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uniq_emp_proj_review (EmpID, ProjectID, ReviewDate)
) ENGINE=InnoDB;

CREATE TABLE Reward (
  RewardID INT PRIMARY KEY AUTO_INCREMENT,
  EmpID INT NOT NULL,
  RewardMonth DATE NOT NULL,
  RewardAmount DECIMAL(10,2) NOT NULL CHECK (RewardAmount >= 0),
  CONSTRAINT fk_reward_emp FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uniq_emp_month (EmpID, RewardMonth)
) ENGINE=InnoDB;

CREATE INDEX idx_employee_name ON Employee (EmpName);
CREATE INDEX idx_employee_deptid ON Employee (DeptID);
CREATE INDEX idx_performance_empid ON Performance (EmpID);
CREATE INDEX idx_performance_projectid ON Performance (ProjectID);
CREATE INDEX idx_project_deptid ON Project (DeptID);
CREATE INDEX idx_reward_empid ON Reward (EmpID);
CREATE INDEX idx_reward_month ON Reward (RewardMonth);

INSERT INTO Department (DeptID, DeptName, Location) VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Sales', 'Chennai'),
(105, 'Marketing', 'Hyderabad');

INSERT INTO Employee (EmpName, Gender, DOB, HireDate, DeptID) VALUES
('Asha', 'F', '1990-07-12', '2018-06-10', 101),
('Raj', 'M', '1988-04-09', '2020-03-22', 102),
('Neha', 'F', '1995-01-15', '2021-08-05', 101),
('Vikram', 'M', '1992-11-02', '2019-02-15', 103),
('Priya', 'F', '1994-09-25', '2022-04-01', 104),
('Sameer', 'M', '1987-12-30', '2017-01-20', 105);

INSERT INTO Project (ProjectName, DeptID, StartDate, EndDate) VALUES
('Alpha', 101, '2019-01-01', '2020-12-31'),
('Beta', 101, '2021-03-01', NULL),
('Onboard', 102, '2020-05-01', '2020-12-31'),
('CashFlow', 103, '2018-07-01', '2019-12-31'),
('MarketBoost', 105, '2023-01-01', NULL),
('SalesDrive', 104, '2022-02-01', '2023-06-30');

INSERT INTO Performance (EmpID, ProjectID, Rating, ReviewDate) VALUES
(1, 1, 4.50, '2019-12-10'),
(1, 2, 4.20, '2021-12-15'),
(2, 3, 3.80, '2020-11-05'),
(3, 2, 4.00, '2021-11-20'),
(4, 4, 4.60, '2019-06-30'),
(5, 6, 3.90, '2022-10-10'),
(6, 5, 4.10, '2023-05-18'),
(2, 1, 3.70, '2019-10-01');

INSERT INTO Reward (EmpID, RewardMonth, RewardAmount) VALUES
(1, '2019-12-01', 2500.00),
(2, '2020-11-01', 1500.00),
(3, '2021-12-01', 2200.00),
(4, '2019-06-01', 3000.00),
(5, '2022-10-01', 900.00),
(6, '2023-05-01', 2100.00);

UPDATE Employee SET DeptID = 101 WHERE EmpName = 'Priya';

DELETE FROM Reward WHERE RewardAmount < 1000;

SELECT EmpID, EmpName, HireDate, DeptID
FROM Employee
WHERE HireDate > '2019-01-01';

SELECT d.DeptID, d.DeptName, ROUND(AVG(p.Rating),2) AS AvgRating
FROM Department d
JOIN Employee e ON e.DeptID = d.DeptID
JOIN Performance p ON p.EmpID = e.EmpID
GROUP BY d.DeptID, d.DeptName;

SELECT EmpID, EmpName, DOB,
       FLOOR(DATEDIFF(CURRENT_DATE, DOB) / 365.25) AS AgeYears
FROM Employee;

SELECT YEAR(CURRENT_DATE) AS Year, 
       SUM(RewardAmount) AS TotalRewardsThisYear
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURRENT_DATE);

SELECT DISTINCT e.EmpID, e.EmpName, r.RewardMonth, r.RewardAmount
FROM Employee e
JOIN Reward r ON r.EmpID = e.EmpID
WHERE r.RewardAmount > 2000;

SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating, p.ReviewDate
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID
JOIN Department d ON e.DeptID = d.DeptID
ORDER BY d.DeptName, e.EmpName, p.ReviewDate;

WITH EmpAvg AS (
  SELECT e.EmpID, e.EmpName, e.DeptID, ROUND(AVG(p.Rating),2) AS AvgRating
  FROM Employee e
  JOIN Performance p ON e.EmpID = p.EmpID
  GROUP BY e.EmpID, e.EmpName, e.DeptID
)
SELECT d.DeptName, ea.EmpID, ea.EmpName, ea.AvgRating
FROM EmpAvg ea
JOIN Department d ON d.DeptID = ea.DeptID
WHERE ea.AvgRating = (
  SELECT MAX(AvgRating) FROM EmpAvg ea2 WHERE ea2.DeptID = ea.DeptID
)
ORDER BY d.DeptName;

SELECT e.EmpID, e.EmpName, e.DeptID
FROM Employee e
WHERE e.EmpID NOT IN (SELECT r.EmpID FROM Reward r);

DELIMITER $$
CREATE PROCEDURE AddEmployeeWithPerformance(
  IN p_EmpName VARCHAR(150),
  IN p_Gender ENUM('M','F','O'),
  IN p_DOB DATE,
  IN p_HireDate DATE,
  IN p_DeptID INT,
  IN p_ProjectID INT,
  IN p_Rating DECIMAL(3,2),
  IN p_ReviewDate DATE
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
  END;

  START TRANSACTION;

    INSERT INTO Employee (EmpName, Gender, DOB, HireDate, DeptID)
    VALUES (p_EmpName, p_Gender, p_DOB, p_HireDate, p_DeptID);

    SET @newEmpID = LAST_INSERT_ID();

    INSERT INTO Performance (EmpID, ProjectID, Rating, ReviewDate)
    VALUES (@newEmpID, p_ProjectID, p_Rating, p_ReviewDate);

  COMMIT;
END$$
DELIMITER ;

EXPLAIN FORMAT=TRADITIONAL
SELECT e.EmpID, e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID
JOIN Department d ON e.DeptID = d.DeptID
WHERE e.EmpName LIKE '%a%' AND YEAR(p.ReviewDate) = 2021;

CREATE INDEX idx_perf_emp_review ON Performance (EmpID, ReviewDate);
CREATE INDEX idx_employee_name_dept ON Employee (EmpName, DeptID);

EXPLAIN FORMAT=TRADITIONAL
SELECT e.EmpID, e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID
JOIN Department d ON e.DeptID = d.DeptID
WHERE e.EmpName LIKE '%a%' AND YEAR(p.ReviewDate) = 2021;

DROP VIEW IF EXISTS EmployeePerformanceView;
CREATE VIEW EmployeePerformanceView AS
SELECT e.EmpID, e.EmpName, e.Gender, e.DOB, e.HireDate,
       d.DeptID, d.DeptName, d.Location,
       p.ProjectID, p.Rating, p.ReviewDate
FROM Employee e
LEFT JOIN Department d ON e.DeptID = d.DeptID
LEFT JOIN Performance p ON e.EmpID = p.EmpID;

DELIMITER $$
DROP PROCEDURE IF EXISTS GetTopPerformers;
CREATE PROCEDURE GetTopPerformers(IN p_deptName VARCHAR(100))
BEGIN
  SELECT ea.EmpID, ea.EmpName, d.DeptName, ROUND(ea.AvgRating,2) AS AvgRating
  FROM (
    SELECT e.EmpID, e.EmpName, e.DeptID, AVG(p.Rating) AS AvgRating
    FROM Employee e
    JOIN Performance p ON e.EmpID = p.EmpID
    GROUP BY e.EmpID, e.EmpName, e.DeptID
  ) ea
  JOIN Department d ON d.DeptID = ea.DeptID
  WHERE d.DeptName = p_deptName
  ORDER BY ea.AvgRating DESC
  LIMIT 3;
END$$
DELIMITER ;

