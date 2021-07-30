WITH days(day) AS (
  VALUES ( 'Monday' ), ( 'Tuesday' ), ( 'Wednesday' ), ( 'Thursday' ), ( 'Friday' )
)
INSERT INTO days (name)
SELECT day FROM days;