<h1><img height="64px" src="./kitsune.ico" width="64px"/> Kitsune Wrapper</h1>
Kitsune Wrapper  -  a investigation into simple modular wrapper framework for use 
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

_**'kitsune-wrapper-library'**_ is included but no need to link this library
directly unless you want to extend upon it, package.json already has
the library referenced for installing.
To build and launch..

build all modules and launch wrapper and web socket server:
```
from root "kitsune" folder execute...

npm run build-from-scratch

then open your browser to localhost:8080
```

load up localhost:8080 in your browser and you'll be able to observe
current loading examples from monitoring the information in dev tools.

Main branch of the project contains:
````
kitsune-wrapper                 :   the wrapper

kitsune-wrapper-library         :   the shared library

kitsune-wrapper-extensions      :   early injectable extension examples, 
                                    dynamic loading and code execution of 
                                    external unlinked packages

kitsune-application-test-dummy  :   rough WIP application

kitsune-ws-server               :   rough WIP web socket server
````

# Further reading

**More information coming...**
<p style="font-size: smaller; font-style: italic" onclick="alert('you sweaty scumbag fox')" content="In Japanese folklore, kitsune are foxes that possess paranormal
abilities that increase as they get older and wiser." />

_In Japanese folklore, kitsune are foxes that possess paranormal
abilities that increase as they get older and wiser._

