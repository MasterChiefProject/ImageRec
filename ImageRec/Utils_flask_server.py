from flask import Flask, render_template
from flask import render_template, render_template_string
from flask import request
from flask import jsonify
from flask import send_from_directory

import oci
import json

from oci.config import from_file
import base64
import json
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
import pandas as pd
from PIL import Image
from io import BytesIO


from oci.ai_vision import AIServiceVisionClient
from oci.ai_vision.models import AnalyzeImageDetails
from oci.ai_vision.models import ImageObjectDetectionFeature
from oci.ai_vision.models import ImageTextDetectionFeature
from oci.ai_vision.models import InlineImageDetails


app = Flask(__name__)














compId = "ocid1.compartment.oc1..aaaaaaaar4m5fidceghuawmgmvu3xd7cr45tmoknplxjeqjtprmwzdu2532a"
namespace = "colmanhack"
config = from_file('~/.oci/config', 'DEFAULT')

############################################################################3

object_storage_client = oci.object_storage.ObjectStorageClient(config)
bucket_name = 'Ai-Images'
object_name = 'asd123.png'


@app.route('/<path:filename>')
def FileGet(filename):    
    filename = filename or 'Chat_Ui.html'
    if request.method == 'GET':
        return send_from_directory('.', filename)

    return jsonify(request.data)




##########################################################

ai_vision_response = oci.ai_vision.AIServiceVisionClient(config=config)

### Getting a list of all the models
list_models = ai_vision_response.list_models(compartment_id=compId)
# print(list_models.data)

### Getting the model ocid
model_id = list_models.data.items[0].id
# print(model_id)

### Getting model data
get_model_response = ai_vision_response.get_model(model_id=model_id)
model_data = get_model_response.data
# print(model_data)
print(model_data.precision)

#### Uploading the image we want to check
import base64


encoded_string = None
with open("Images/sickplant.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

# encoded_string = None
# with open(Image, "rb") as image_file:
#     encoded_string = base64.b64encode(image_file.read())



###################################################################################



# Getting the model 
image_classification_feature = oci.ai_vision.models.ImageClassificationFeature()
image_classification_feature.max_results = 10
image_classification_feature.model_id = model_id

features = [image_classification_feature]

# print(image_classification_feature)


analyze_image_details = oci.ai_vision.models.AnalyzeImageDetails()
inline_image_details = oci.ai_vision.models.InlineImageDetails()
inline_image_details.data = encoded_string.decode('utf-8')
analyze_image_details.image = inline_image_details
analyze_image_details.features = features

# Send analyze image request
res = ai_vision_response.analyze_image(analyze_image_details=analyze_image_details)
# res = ai_service_vision_client.analyze_image(analyze_image_details=analyze_image_details)

# Parse Response as JSON
od_results = json.loads(str(res.data))

print(od_results)

# print(od_results['labels'])

labels_results = od_results['labels']
print(labels_results)
print(labels_results[0]['confidence'])

# convert data to numpy arrays
x = np.array([labels_results[0]['name'], labels_results[1]['name'], labels_results[2]['name'], labels_results[3]['name'], labels_results[4]['name']])
y = np.array([labels_results[0]['confidence'], labels_results[1]['confidence'], labels_results[2]['confidence'], labels_results[3]['confidence'], labels_results[4]['confidence']])

# find index of highest confidence value
max_idx = np.argmax(y)

# get corresponding name from x array
max_name = x[max_idx]

print("Highest confidence label: ", max_name)

plt.figure(figsize=(13,6))
plt.bar(x,y)
plt.show()

print(max(y))
print()

@app.route('/', methods=['GET', 'POST'])
def index():    
     return render_template('Chat_Ui.html', max_name=max_name)



# if __name__ == '__main__':
#    app.run()
if __name__ == '__main__':
    app.run(debug=True)

