import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
app = Flask(__name__)
model=pickle.load(open('model.pkl','rb'))
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    #int_features = [float(x) for x in request.form.values()]
    int_features= [0,2,1,2,3,2,3,2,3,2]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)
    output = prediction[0]
    return render_template('index.html', prediction_text='According to the Pscyometric Test taken,The feeling of Depression is : {}'.format(output))
if __name__ == "__main__":
    app.run(debug=True)


"""@app.route('/predict_api',methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction[0]
    return jsonify(output)"""
"""import numpy as np
from flask import Flask, request, render_template
import pickle
app = Flask(__name__)
model=pickle.load(open('model.pkl','rb'))
@app.route('/')
def home():
    return render_template('index.html')
#@app.route('/predict',methods=['POST'])
@app.route('/predict',methods=['POST','GET'])
def predict():
    int_features=[x for x in request.form.get('table', 0)]
    final=[np.array(int_features)]
    print(int_features)
    print(final)
    prediction=model.predict_proba(final)
    output='{0:.{1}f}'.format(prediction[0][1], 2)

    if output>str(0.5):
        return render_template('index.html',pred='Your Forest is in Danger.\nProbability of fire occuring is {}'.format(output),bhai="kuch karna hain iska ab?")
    else:
        return render_template('index.html',pred='Your Forest is safe.\n Probability of fire occuring is {}'.format(output),bhai="Your Forest is Safe for now")
 """
   
#int_features = [2,3,2,3,3,2,3,3,3,1]
    #int_features= [0,0,0,0,0,0,0,0,0,0]