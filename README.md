
This sample app serves to demonstrate an example of micro-frontend implementation with Zoom Meeting SDK. It consists of the following apps in the respective directories:

* container (container app)
* auth app (micro-frontend app)
* booking app (micro-frontend app)
* dashboard app (micro-frontend app)
* msdk app  (micro-frontend app)
---
## Prerequisites :
* AWS account along with Key containing  S3 and CloudFront access
---
### Starting the container app: container
The container will have all of the mircofrontend. Navigate to the container directory and run the following:

```
 $ cd container 
 
 $ npm start 

```
---
### Starting the micro-frontend: booking
You can similarly navigate to the booking directory and run the following commands to start the micro-frontend. It will serve up the micro-frontend JavaScript bundle at http://localhost:8081/

```
 $ cd  booking 
 
 $ npm start 
```
---
### Starting the micro-frontend: auth
You can similarly navigate to the auth directory and run the following commands to start the micro-frontend. It will serve up the micro-frontend JavaScript bundle at http://localhost:8082/

```
 $ cd  auth 
 
 $ npm start 
```
---
### Starting the micro-frontend: msdk 
You can similarly navigate to the msdk directory and run the following commands to start the micro-frontend. It will serve up the micro-frontend JavaScript bundle at http://localhost:8088/

```
 $ cd msdk  
 
 $ npm start 
```
---
### S3 Bucket Creation and Configuration
<details>
<summary> Steps </summary>
<ul>
<li> Go to AWS Management Console and use the search bar to find S3 </li>
<li> Click Create Bucket</li>
<li> Specify an AWS Region</li>
<li> Provide unique Bucket Name and click Create Bucket</li>
<li> Click the new Bucket you have created from the Bucket list.</li>
<li>Select Properties</li>
<li>Scroll down to Static website hosting and click Edit</li>
<li>Change to Enable</li>
<li>Enter index.html in the Index document field</li>
<li>Click Edit in Block all public access</li>
<li>Untick the Block all public access box.</li>
<li>Click Save changes</li>
<li>Type confirm in the field and click Confirm</li>
<li>Find the Bucket Policy and click Edit</li>
<li>Click Policy generator</li>
<li>Change Policy type to S3 Bucket Policy</li>
<li>Set Principle to *</li>
<li> Copy the S3 bucket ARN to add to the ARN field and add /* to the end.
eg: arn:aws:s3:::mfe-dashboard/*</li>
<li>Click Add Statement</li>
<li>Set Principle to *</li>
<li>Click Generate Policy</li>
<li>Copy paste the generated policy text to the Policy editor</li>
<li>Click Save changes</li>

</ul>
</details>

### CloudFront setup
<details>
<summary> Steps </summary>
<ul>
<li> Go to AWS Management Console and use the search bar to find CloudFront </li>
<li>Click Create distribution</li>
<li> Set Origin domain to your S3 bucket</li>
<li> Find the Default cache behavior section and change Viewer protocol policy to Redirect HTTP to HTTPS</li>
<li> Scroll down and click Create Distribution.</li>
<li>After Distribution creation has finalized click the Distribution from the list, find its Settings and click Edit</li>
<li>Scroll down to Static website hosting and click Edit</li>
<li>Scroll down to find the Default root object field and enter /container/latest/index.html</li>
<li>Click Save changes</li>
<li>Click Error pages</li>
<li>Click Create custom error response</li>
<li>Change HTTP error code to 403: Forbidden</li>
<li>Change Customize error response to Yes</li>
<li>Set Response page path to /container/latest/index.html</li>
<li>Set HTTP Response Code to 200: OK</li>
</details>

### Create IAM user
<details>
<summary> Steps </summary>
<ul>
<li> Go to AWS Management Console and use the search bar to find IAM</li>
<li>In IAM dashboard, click Users in the left sidebar</li>
<li> Click Add Users</li>
<li> Enter a unique name in the User name field</li>
<li>In Select AWS credential type tick Access Key - Programmatic access</li>
<li>Click Next: Permissions</li>
<li>Select Attach existing policies directly</li>
<li>Use search bar to find and tick AmazonS3FullAccess and CloudFrontFullAccess</li>
<li>Click Next: Tags</li>
<li>Click Next: Review</li>
<li>Click Create user</li>
</details>

---

##### Requirements for Inflexible Frontend Architecture
<details>
<summary> Requirement #1 </summary>
<ul>
<li> Zero coupling between child projects </li>
<li> No importing of functions/objects/classes./etc</li>
<li> No shared state</li>
<li> Shared libraries through Module Federation System is okay</li>
</ul>
</details>

<details>
<summary> Requirement #2 </summary>
<ul>
<li> Nero-zero coupling between container and child apps </li>
<li> Container shouldn't assume that a child is using a particular framework</li>
<li> Any necessary communication done with callbacks or simple events</li>
</ul>
</details>

<details>
<summary> Requirement #3 </summary>
<ul>
<li> CSS from one project shouldn’t affect another, CSS should be scoped and not shared. Change to one project, should not affect another.</li>
</ul>
</details>

<details>
<summary> Requirement #4 </summary>
<ul>
<li> Version Control (mono-repo vs separate shouldn’t have any impact on the overall project) </li>
</ul>
</details>

<details>
<summary> Requirement #5 </summary>
<ul>
<li> Container should be able to decide to always use the latest version of a mirco-frontend or specify version </li>
<ul>
<li> (1) Container will always use the latest version of a chid app (doesn’t require a redeploy of container)   </li>
<li> (2) Container can specify exactly what version of a child it wants to use (requires a redeploy change)</li>
</ul>
</ul>
</details>
 

## Notes
* If change made to Webpack configuration files, must restart server for it to take affect
