
#### The container will have all of the mircofrontend. To rum apps navigate to each subapp folder and run npm start: 

 `$ cd container && npm start `

 `$ cd booking && npm start `

 `$ cd auth && npm start `

` $ cd msdk && npm start `


<details>
#### <summary>Requirement #1 for Inflexible Frontend Architecture</summary>
<ul>
<li> Zero coupling between child projects </li>
<li> No importing of functions/objects/classes./etc</li>
<li> No shared state</li>
<li> Shared libraries through Module Federation System is okay</li>
</ul>
</details>

####  Requirement #2 for Inflexible Frontend Architecture:

* Nero-zero coupling between container and child apps

* Container shouldn't assume that a child is using a particular framework

* Any necessary communication done with callbacks or simple events


####  Requirement #3 for Inflexible Frontend Architecture:

* CSS from one project shouldn’t affect another, CSS should be scoped and not shared. Change to one project, should not affect another.

####  Requirement #4 for Inflexible Frontend Architecture:

* Version Control (mono-repo vs separate shouldn’t have any impact on the overall project) 
  
####  Requirement #5 for Inflexible Frontend Architecture:
* Container should be able to decide to always use the latest version of a mirco-frontend or specify version    

  * (1) Container will always use the latest version of a chid app (doesn’t require a redeploy of container)    

  * (2) Container can specify exactly what version of a child it wants to use (requires a redeploy change)

# Notes
* If change made to Webpack configuration files, must restart server for it to take affect
