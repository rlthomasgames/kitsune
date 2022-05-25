<h1><img height="64px" src="./kitsune.ico" width="64px"/> Kitsune Wrapper</h1>
Kitsune Wrapper  -  investigation into a simple modular wrapper for use with applications and games. 
Wrapper extensions and functionality registered and loaded during runtime initialization.
Hopefully keeping initial load time short and only inflating the wrapper as needed during runtime.


# Usage

Check out the repo
```
git clone https://github.com/rlthomasgames/kitsune.git
```

kitsune-wrapper-library is included but no need to link this library
directly unless you want to extend upon it, package.json already has
the library referenced for installing so the best option to run
everything is to load up the kitsune-wrapper project first
and run these commands:
```
    npm i
    npm run build
```

this will build the wrapper as a production build,
development build methodology is still under development.
then load up the kitsune extensions project and run the same commands:
```
    npm i
    npm run build
```

this will build 2 example extensions and deliver the outputted modules
to the wrappers' dist folder.

currently, the project structure and relative locations of folders
are slightly important, changes to make it more flexible
are hopefully coming soon.

once both projects successfully build. you can host the dist folder using...
http-server package from npm, just install it globally and then run 
```
http-server ./
```

from a command line within the dist folder.
then load up localhost:8080 in your browser and you'll be able to observe
current loading examples from dev tools.

Main branch of the project contains:
````
kitsune-wrapper            :  the wrapper

kitsune-wrapper-library    :  the shared library

kitsune-wrapper-extensions :  early injectable extension examples, 
                              dynamic loading and code execution of 
                              external unlinked packages

kitsune-wrapper-examples   :  coming soon! - games and stuff :)
````

# Further reading

More information coming...
