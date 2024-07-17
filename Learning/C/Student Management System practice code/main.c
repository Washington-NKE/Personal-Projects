#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 100

//Structure to represent a student
struct Student {
int id;
char name[50];
int age;
float grade;
};

//Function prototypes
void displayMenu();
void addStudent();
void listStudents();
void updateStudent();
void deleteStudent();
void saveData();
void loadData();

//Global variables
struct Student students[MAX_STUDENTS];
int numStudents = 0;

int main(){
    loadData(); //Load existing student data from file
    int choice;
    do{
        displayMenu();
        printf("Enter your choice:");
        scanf("%d", &choice);
        getchar(); //Clear newline from input buffer

        switch(choice){
    case 1:
        addStudent();
        break;
    case 2:
        listStudents();
        break;
    case 3:
        updateStudent();
        break;
    case 4:
        deleteStudent();
        break;
    case 5:
        saveData(); //Save student data to file
        printf("Student data saved. \n");
    case 0:
        printf("Exiting program. \n");
        break;
    default:
        printf("Invalid choice. Please enter a number from 0 to 5. \n");
        }
    }while(choice != 0);

    return 0;
}

// Function to display menu options
void displayMenu() {
printf("\n==== Student Database Management System ====\n");
printf("1. Add Students\n");
printf("2. List Students\n");
printf("3. Update Students\n");
printf("4. Delete Student\n");
printf("5. Save Data\n");
printf("0. Exit\n");
}

//Function to add a new student
void addStudent() {
if(numStudents >= MAX_STUDENTS) {
    printf("Maximum number of students reached. Cannot add more. \n");
    return;
}

struct Student newStudent;
printf("Enter Student ID: ");
scanf("%d", &newStudent.id);
getchar();//Clear newline from input buffer

printf("Enter Name: ");
fgets(newStudent.name,
      sizeof(newStudent.name),stdin);
      newStudent.name[strcspn(newStudent.name,
                              "\n")] = '\0';//Remove new line character

printf("Enter Age");
scanf("%d", &newStudent.age);

printf("Enter Grade");
scanf("%f", &newStudent.grade);

students[numStudents++] = newStudent;
printf("Student added successfully. \n");
}

//Function to list all students
void listStudents() {
if(numStudents == 0) {
    printf("No students to display. \n");
    return;
}

printf("===== List of Students ====\n");
for(int i=0; i<numStudents;i++){
    printf("ID: %d, Name: %s, Age: %d, Grade: %2f\n", students[i].id, students[i].name, students[i].age, students[i].grade);
}
}

//Function to update a student's information
void updateStudent() {
int idToUpdate;
printf("Enter Student ID to update: ");
scanf("%d", &idToUpdate);

for(int i = 0; i<numStudents; i++){
    if(students[i].id == idToUpdate) {
        printf("Enter New Name: ");
        getchar(); // clear newline from input buffer
        fgets(students[i].name, sizeof(students[i].name) stdin);
        students[i].name[strcspn(students[i].name, "\n")] = '\0'; //Remove newline character

        printf("Enter New Age: ");
        scanf("%d", &students[i].age);

        printf("Enter New Grade: ");
        scanf("%f", &students[i].grade);

        printf("Student updated successfully. \n");
        return;
    }
}
}

printf("Student ID not found. \n");

//Function to delete a student
void deleteStudent(){
int idToDelete;
printf("Enter Student ID to delete: ");
scanf("%d", &idToDelete);

for (int i=0; i< numStudents; i++) {
    if(students[i].id == idToDelete){
        //Move the last student in the array to this position
        students[i].id = students[numStudents - 1];
        numStudents--;
        printf("Student deleted successfully. \n");
        return;
    }
}
printf("Student ID not found. \n");
}

//Function to save student data to file
void saveData() {
    FILE *fp = fopen("students.txt", "w");
    if(fp == NULL) {
        perror("Error opening file");
        return;
    }
    for(int i=0; i<numStudents; i++) {
        fprintf(fp, "%d,%s,%d,%2f\n",students[i].id,students[i].name,students[i].age,students[i].grade);
    }
    fclose(fp);
}

//Function to load student data from file
void loadData(){
FILE*fp = fopen("Students.txt","r");
if(fp == NULL) {
    printf("No existing data found. Start with an empty database. \n");
    return;
}
while(!feof(fp) &&numStudents < MAX_STUDENTS) {
    fscanf(fp, "%d, %[^],%d,%f\n", &students[numStudents].id, students[numStudents].name, &students[numStudents].age, &students[numStudents].grage);
    numStudents++;
}
fclose(fp);
}
