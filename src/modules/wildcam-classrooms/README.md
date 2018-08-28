## WildCam Classrooms

WildCam Classrooms are a part of **"WildCam Lab" Programs,** e.g. WildCam
Darien Lab. You'll also want to look at the [WildCam Map](../wildcam-map)
module.

This module contains the building blocks required to create Classrooms, where
Teachers can create/manage custom Assignments (by selecting specific Subjects
and creating specific goals) to be given to Students.

WildCam Classrooms are named after the first project of its type, WildCam
Gorongosa Lab, which used camera trap data from the WildCam Gorongosa project
and is (was?) hosted on https://lab.wildcamgorongosa.org/ (launched 2016, still
running as of 2018). The best people to ask about this project are Shaun,
Simone, and Ali.

_Documentation prepared by @shaun.a.noordin at 2018.08.28_

### Requirements and Mechanics

Setup/Template:
- To create a "WildCam Lab Program", look at how the
  [WildCam Darien Program](../../programs/darien) is set up in this repo, how
  its `config` is set up, and how its pages import components from this module.

External Dependency - Zooniverse Project:
- Each WildCam Program needs to correspond to a Zooniverse Proejct.
- To allow Students to work on their specific Assignmnets, the
  `allow_workflow_query` experimental tool must be enabled for the Zooniverse
  Project.
  - See: https://github.com/zooniverse/how-to-zooniverse/blob/master/ProjectLifecycle/experimental_tools.md#allow-workflow-query
  - Basically, go to `https://www.zooniverse.org/admin/project_status/foo/bar`
    with a privileged Zooniverse account, enable **admin mode,** then enable
    "Allow workflow query".
  - This will allow us to send Students to their Assignments (i.e. Workflows) by
    linking them to `https://www.zooniverse.org/projects/foo/bar/classify?workflow=3262`

External Dependency - Education API:
- A "WildCam Lab" program must be set up in the Education API, and it has to be
  set as a "custom" program.
  - **NOTE:** Each Assignment created via the Education API Front End is linked
    to an Assignment in Panoptes.
  - In practice, with "custom" programs, when a Teacher creates a new Assignment
    in Zooniverse Classrooms, a matching Workflow resource and Subject Set
    resource is also created in Panoptes, attached to the Zooniverse Project
    corresponding to the Program. The newly created Workflow is cloned from the
    Project's main workflow, except it has a specific set of Subjects.

Internal(?) Dependency - WildCam Map module:
- Most sensible WildCam Lab Programs will incorporate the WildCam Map module,
  because that's what Teachers use to select Subjects for the Assignments.
- See the template program (WildCam Darien) to understand how it incorporates
  the WildCam Map module.
