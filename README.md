<h1><img height="64px" src="./kitsune.ico" width="64px"/> Kitsune Wrapper</h1>
Kitsune Wrapper  -  investigation into a simple modular wrapper for use with applications and games. 
Wrapper extensions are loaded during runtime initialization.
Intention is to keep initial load time short and only inflating the wrapper size with required 
modules specified by the application or game it fetches. It provides implementation of the modules instantiation and execution by the use of dependency injection and shared interfaces. 

# Usage

Check out the repo
```
git clone https://github.com/rlthomasgames/kitsune.git
```

_**'kitsune-wrapper-library'**_ is included but no need to link this library
directly unless you want to extend upon it, package.json already has
the library referenced for installing so the best option to run
everything is to load up the _**'kitsune-wrapper'**_ project first
and run these commands:
```
    npm i
    npm run build
```

this will build the wrapper as a production build,
development build methodology is still under development.
once wrapper has built open the _**'kitsune-wrapper-extensions'**_ project 
and run the same commands:
```
    npm i
    npm run build
```

this will build 2 example extensions and deliver the output modules
to the wrappers' dist folder.

currently, the project structure and relative locations of folders
are slightly important, changes to make it more flexible
are hopefully coming soon.

once both projects successfully build. you can host the dist folder using...    
**_http-server_**   package from npm, just install it globally and run this command
from a command line within the _**'kitsune-wrapper'**_ dist folder.
```
http-server ./
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

kitsune-wrapper-app-examples    :   coming soon! - games and stuff :)
````

# Further reading

**More information coming...**
<p style="font-size: smaller; font-style: italic; background-color: gray" onclick="alert('you sweaty scumbag fox')" content="In Japanese folklore, kitsune are foxes that possess paranormal
abilities that increase as they get older and wiser." />

_In Japanese folklore, kitsune are foxes that possess paranormal
abilities that increase as they get older and wiser._

