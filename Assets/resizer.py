from PIL import Image
from glob import glob
from os import remove

for path in glob('./Assets/**/*.png', recursive = True):
    im = Image.open(path)
    remove(path)
    im.resize((275, 275)).save(path)

print("Done!")