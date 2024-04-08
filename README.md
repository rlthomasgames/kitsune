<h1><img height="64px" src="./kitsune.ico" width="64px"/> Kitsune Wrapper</h1>
Kitsune Wrapper  - investigation into simple modular wrapper framework for use 
with applications or games.

Wrapper extensions are loaded during runtime without any prior knowledge or footprint
of an extensions particular content, allowing developers to dictate when and which 
extensions or modules are loaded.

Intention is to keep wrappers initial load time as short as possible and only inflate the wrapper 
size with required extensions specified by the application / game the wrapper hosts. 

Current implementation should include examples of -

      ~   loading external unknown modules    
      ~   factory methods to extract extension's that are loaded           
      ~   instantiation and execution of the extension's                 
      ~   dependency injection providing accesibility of extension's
      ~   loose coupling between all parts using a shared library of interfaces
This should also help speed up implementing of boilerplate / common tasks which are often required.
As well as hopefully some nice to haves.

e.g


      ~   asset loading
      ~   third party services / platform integration
      ~   general functionality ( sounds, display, communications... )
      ~   I/O devices gamepads, webcams, microphones...
      ~   NFT's management systems???
      ~   etc. etc. etc.... 
      

# Usage

Check out the repo
```
git clone https://github.com/rlthomasgames/kitsune.git
```

build all modules and launch wrapper and web socket server *(requires mongoDB community installation)* :
```
npm i

npm run install-build-launch

then open your browser to localhost:8080

currently not auto-generating lib folders, so might need to manually create them if this issue appears at build, sorry

also if not loading whilst webpack-devserver is running, re-build ./client/kitsune-wrapper-extensions then ./client/kitsune-application-test-dummy, 
check you have correct privledges, insure mongoDB and rest server is running, will try to deliver a easier to build version soon..
```

load up localhost:8080 in your browser and you'll be able to observe
current loading examples from monitoring the information in dev tools.

Main branch of the project contains:
_*'client'*_
````
kitsune-wrapper                 :   the wrapper
kitsune-wrapper-extensions      :   early injectable extension examples, 
                                    dynamic loading and code execution of 
                                    external unlinked packages
kitsune-application-test-dummy  :   rough WIP application
````
_*'server'*_
````
kitsune-ws-server               :   rough WIP web socket server
kitsune-rest-server             :   rough WIP rest server
kitsune-asset-store             :   rough WIP asset store
kserver                         :   launcher for server and client
````
_*'shared'*_
````
kitsune-wrapper-library         :   the shared library
````

# Further reading

**More information coming...**
