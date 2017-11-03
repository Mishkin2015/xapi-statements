import * as assert from 'assert';
import { getActivitiesFromStatement, getRelatedActivitiesStatement } from '../../../service/storeStatements/queriables/getActivitiesFromStatement';
import Statement from '../../../models/Statement';
import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Context from '../../../models/Context';

const ACTIVITY_ID = 'http://example.org/test-activity';
const ACTIVITY_ID2 = 'http://example.org/test-activity2';
const ACTIVITY_ID3 = 'http://example.org/test-activity3';

const agent: Agent =  {
  objectType: 'Agent',
  mbox: 'mailto:test@test.com'
};

const activity: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID
};

const statementDefaults: Statement = {
  id: 'testvalue',
  authority: agent,
  stored: 'testvalue',
  timestamp: 'testvalue',
  version: 'testvalue',
  actor: agent,
  object: activity,
  verb: {
    id: 'http://example.org/verb'
  }
}

const activity2: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID2
};
const activity3: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID3
};

const agentObjectModel: Statement = {
  ...statementDefaults,
  object: agent
};

const activityObjectmodel: Statement = {
  ...statementDefaults,
  object: activity,
  context: {
    contextActivities: {
      parent: [
        activity
      ],
      grouping: [
        activity,
        activity2
      ],
      category: [],
    }
  }
};

const subStatementObjectmodel: Statement = {
  ...statementDefaults,
  object: {
    objectType: 'SubStatement',
    actor: agent,
    verb: {
      id: 'http://example.org/verb'
    },
    object: activity,
    context: activityObjectmodel.context
  },
  context: {
    contextActivities: {
      parent: [
        activity3
      ],
      grouping: [
      ],
      category: [],
      other: []
    }
  }
};

describe('create array of queriable activities', () => {
  it('should return the related activities', () => {
    const activities = getActivitiesFromStatement(activityObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID]);
  });

  it('should return the related activities', () => {
    const activities = getRelatedActivitiesStatement(activityObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID, ACTIVITY_ID2]);
  });

  it('should return the related activities with a substatement', () => {
    const activities = getRelatedActivitiesStatement(subStatementObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID3, ACTIVITY_ID, ACTIVITY_ID2]);
  });

  it('should return no related activities from an agent object statement', () => {
    const activities = getRelatedActivitiesStatement(agentObjectModel);
    assert.deepEqual(activities, []);
  });
});