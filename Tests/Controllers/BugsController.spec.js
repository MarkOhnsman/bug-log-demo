import { MockAuth0Provider } from '@bcwdev/auth0provider';
import ava from 'ava';
import supertest from 'supertest';
import { BugsController } from '../../server/controllers/BugsController';
import { MockApp } from '../_config/_mockAppB';
import { EstablishFakeDb } from '../_config/_mockDbB';
import { USERS } from '../_config/_usersB';

const app = MockApp(new BugsController())
const authMock = new MockAuth0Provider()
const request = supertest(app)

ava.before('Setup DB', async t => {
  try {
    await EstablishFakeDb()
    t.pass();
  } catch (error) {
    console.error("[FAKEDB ERROR]", error)
    t.fail()
  }
});

ava.serial("Must be logged in to Get Bugs", async (t) => {
  try {
    let res = await request.get('/api/bugs')
    t.is(res.status, 401, `Server responded with ${res.status}: ${res.error} instead of 401: Unauthorized`)
  } catch (error) {
    console.error('[ERROR]', error.body)
    t.fail(error.message)
  }
})

ava.serial("Logged in user Can Get Bugs", async (t) => {
  try {
    authMock.setMockUserInfo(USERS.standard)
    let res = await request.get('/api/bugs')
    t.is(res.statusType, 2, `Server responded with ${res.status}: ${res.error} instead of 200: Ok`)
  } catch (error) {
    console.error('[ERROR]', error)
    t.fail(error.message)
  }
})


