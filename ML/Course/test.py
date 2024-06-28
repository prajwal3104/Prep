import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

file_path = "/Users/prajwal/Developer/Prep/ML/Course/spam_ham_dataset.csv"
data = pd.read_csv(file_path)

vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(data['text'])
y = data['label_num']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

nb_classifier = MultinomialNB()
nb_classifier.fit(X_train, y_train) # this is 




y_pred = nb_classifier.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))

print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))


print("Classification Report:\n", classification_report(y_test, y_pred))

# Example messages
new_messages = ["Congratulations! You've won a free ticket to Bahamas. Reply now to claim.", 
                "Hey, are we still meeting for lunch tomorrow?"]

# Vectorize the new messages
new_messages_vec = vectorizer.transform(new_messages)

# Predict and print the results
predictions = nb_classifier.predict(new_messages_vec)
for message, label in zip(new_messages, predictions):
    print(f"Message: {message}\nPrediction: {'spam' if label else 'ham'}\n")
