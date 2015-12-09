Automatic localization of templates of the sites WordPress.
===========================================================

Allows to make machine translation of *.pot of files on other languages. It is realized on the basis of the translator's [Yandex](https://translate.yandex.ru/).

---

##Installation:

```sh
$ npm install
```

##Getting started:

1) To get your own key API ([here](https://tech.yandex.ru/keys/get/?service=trnsl));

2) To specify options for the task;

###Description of parameters:

All the parameters of the task are located in section ```settings``` of the task ```translate```:

    var settings = {
      basePath: 'languages/',
      translateKey: '',
      apiUrl: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    };

* basePath - Base path to directory with templates;

* translateKey - Your key API;

* apiUrl - url API translator's Yandex

###Example of running:

```sh
grunt translate:ru
```

---

##License

Copyright (c) 2015, Sergei Shchetkin All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of
conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without specific prior written permission.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
