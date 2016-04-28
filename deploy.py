import os

os.system("git add . && git ci -m 'update' && git push origin master && ssh pi@collabkings.com 'python ultimatedeploy.py'")