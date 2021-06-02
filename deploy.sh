export VUE_APP_USE_REMOTE_SERVER=true; yarn build; cd dist; rsync -azP . riverdb@riverdb.org:frontend;
