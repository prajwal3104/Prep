import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Load the dataset
url = "https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv"
data = pd.read_csv(url, sep='\t', header=None, names=['label', 'message'])

# Preprocess the data
data['label'] = data['label'].map({'ham': 0, 'spam': 1})

# Vectorize the text data
vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(data['message'])
y = data['label']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Naive Bayes classifier
nb_classifier = MultinomialNB()
nb_classifier.fit(X_train, y_train)

# Evaluate the classifier
y_pred = nb_classifier.predict(X_test)

# Print accuracy
print("Accuracy:", accuracy_score(y_test, y_pred))

# Print confusion matrix
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Print classification report
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
