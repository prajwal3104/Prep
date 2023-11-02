create table ICC_world_cup
(
TEAM_1 varchar(20),
TEAM_2 varchar(20),
Wineer varchar(20)
);

insert into ICC_world_cup value ("India", "SL", "India");
insert into ICC_world_cup value ("SL", "AUS", "AUS");
insert into ICC_world_cup value ("SA","ENG","ENG");
INSERT INTO ICC_world_cup values('Eng','NZ','NZ');
INSERT INTO ICC_world_cup values('Aus','India','India');

select * from ICC_world_cup;

